import { deleteComment, getComments, putComment } from '@/app/api/comments';
import { Comment } from '@planit-types';
import { useCallback, useEffect, useRef, useState } from 'react';

type LoadCommentsProps = {
  cardId: number;
};

export function useComment({ cardId }: LoadCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const commentsEnd = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadComments = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await getComments({ cardId, cursorId });
      const nextCursor = res.cursorId ?? null;
      setComments((prevComments) => {
        const newComments = res.comments.filter(
          (newComment) =>
            !prevComments.some(
              (prevComment) => prevComment.id === newComment.id,
            ),
        );
        return [...prevComments, ...newComments];
      });
      setCursorId(nextCursor);
      setHasMore(res.comments.length > 0 && nextCursor !== null);
    } finally {
      setLoading(false);
    }
  }, [cardId, cursorId, loading, hasMore]);

  const handleDeleteComment = async (commentId: number) => {
    await deleteComment(commentId);
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId),
    );
  };

  const handleModifyComment = async (commentId: number, content: string) => {
    const newComment = await putComment(commentId, content);
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          return newComment;
        }
        return comment;
      }),
    );
  };

  const handleNewComment = async (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
    setCursorId(null);
    setHasMore(true);
    await loadComments();
  };

  useEffect(() => {
    setCursorId(null);
    setHasMore(true);
    setComments([]);
    loadComments();
  }, [cardId]);

  useEffect(() => {
    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting && !loading && hasMore) {
        loadComments();
      }
    };

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(handleObserver, {
      threshold: 1.0,
    });
    if (commentsEnd.current) observer.current.observe(commentsEnd.current);

    return () => observer.current?.disconnect();
  }, [loading, hasMore, loadComments]);

  return {
    comments,
    loading,
    commentsEnd,
    cursorId,
    hasMore,
    loadComments,
    handleDeleteComment,
    handleModifyComment,
    handleNewComment,
  };
}
