'use client';

import { postComment } from '@/app/api/comments';
import { useComment } from '@/hooks/useComment';
import { ChangeEvent, FormEvent, useState } from 'react';

import Comment from './Comment';

type Props = {
  cardId: number;
  columnId: number;
  dashboardId: number;
};

export default function CommentSection({
  cardId,
  columnId,
  dashboardId,
}: Props) {
  const {
    comments,
    loading,
    commentsEnd,
    handleDeleteComment,
    handleModifyComment,
    handleNewComment,
  } = useComment({
    cardId,
  });
  const [error, setError] = useState('');
  const [content, setContent] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setContent(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newComment = await postComment({
        content,
        cardId,
        columnId,
        dashboardId,
      });
      if (newComment) {
        setContent('');
        await handleNewComment(newComment);
      }
    } catch (err) {
      setError('댓글 작성에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <form
        className="w-full md:max-w-420 lg:max-w-450"
        onSubmit={handleSubmit}
      >
        <label className="pb-8 md:pb-10" htmlFor="content">
          댓글
        </label>
        <div className="flex h-70 rounded-md border border-gray-200 p-12 selection:rounded-md focus:border-toss-blue md:h-110">
          <textarea
            onChange={handleChange}
            id="content"
            value={content}
            placeholder="댓글을 입력해주세요"
            className="w-full resize-none rounded-md pr-3 text-12 outline-none placeholder:text-gray-300"
          />
          <button
            disabled={content.length < 1}
            className="relative left-4 top-23 h-28 w-84 rounded-4 border text-12 text-toss-blue disabled:text-gray-400 md:top-58 md:h-32 md:w-77"
            type="submit"
          >
            입력
          </button>
        </div>
      </form>
      <div className="h-140 w-full overflow-scroll">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            commentData={comment}
            handleDelete={handleDeleteComment}
            handleModify={handleModifyComment}
          />
        ))}
        <div ref={commentsEnd} className="h-10" />
        {loading && <div>Loading...</div>}
        {error && <div>Error</div>}
      </div>
    </div>
  );
}
