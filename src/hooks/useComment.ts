import { deleteComment, getComments, putComment } from '@/app/api/comments';
import { Comment, CommentResponse, ErrorMessage } from '@planit-types';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useIntersectionObserver } from './useIntersectionObserver';

type LoadCommentsProps = {
  cardId: number;
};

export function useComment({ cardId }: LoadCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadComments = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const res: CommentResponse | ErrorMessage = await getComments({
      cardId,
      cursorId,
    });
    if ('message' in res) {
      toast.error(res.message);
    } else {
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
    }
    setLoading(false);
  }, [cardId, cursorId, loading, hasMore]);

  const handleDeleteComment = async (commentId: number) => {
    const res = await deleteComment(commentId);
    if ('message' in res) {
      toast.error(res.message);
      return;
    }
    toast.success('성공적으로 삭제되었습니다.');
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId),
    );
  };

  const handleModifyComment = async (commentId: number, content: string) => {
    const newComment = await putComment(commentId, content);
    if ('message' in newComment) {
      toast.error(newComment.message);
      return;
    }

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

  // commentsEnd 변수에 useIntersectionObserver 훅을 호출하여 반환된 ref를 할당.
  // 요소가 뷰포트에 들어왔고, 로딩 중이 아니며 더 불러올 댓글이 있을 경우 loadComments 함수를 호출하여 댓글을 불러옴.
  const commentsEnd = useIntersectionObserver<HTMLDivElement>(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && hasMore) {
        loadComments();
      }
    },
    [loading, hasMore, loadComments],
  );

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
