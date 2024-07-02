import { deleteComment, getComments } from '@/app/api/comments';
import { Comment } from '@planit-types';
import { RefObject, useCallback, useEffect, useState } from 'react';

import useIntersectionObserver from './useIntersectionObserver';

export const useComments = (cardId: number, ref: RefObject<HTMLElement>) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isIntersecting = useIntersectionObserver(ref);

  const handleNewComment = async () => {
    await getComments({ cardId });
  };

  const handleDeleteComment = (commentId: number) => {
    deleteComment(commentId);
    setTimeout(() => {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId),
      );
    }, 1000);
  };

  const loadComments = useCallback(async () => {
    if (!hasMore && cursorId === null) return;
    setError(null);

    try {
      const res = await getComments({ cardId, cursorId });
      setComments((prev) => {
        const newComments = res.comments.filter(
          (newComment) =>
            !prev.some((prevComment) => prevComment.id === newComment.id),
        );

        return [...newComments, ...prev];
      });

      setCursorId(res.cursorId ?? null);
      setHasMore(res.comments.length > 0 && res.cursorId !== null);
    } catch (err) {
      setError('댓글을 불러오는 데 실패했습니다.');
    }
  }, [cardId, cursorId, hasMore]);

  useEffect(() => {
    loadComments();
    handleNewComment();
  }, [handleNewComment]);

  useEffect(() => {
    if (isIntersecting && hasMore) {
      loadComments();
    }
  }, [isIntersecting, hasMore, loadComments]);

  return { comments, hasMore, error, handleDeleteComment, handleNewComment };
};
