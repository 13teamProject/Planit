'use client';

import { postComment } from '@/app/api/comments';
import Spinner from '@/components/commons/spinner';
import { useComment } from '@/hooks/useComment';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

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
  const [content, setContent] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setContent(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newComment = await postComment({
      content,
      cardId,
      columnId,
      dashboardId,
    });
    if ('message' in newComment) {
      toast.error(newComment.message);
      return;
    }
    setContent('');
    await handleNewComment(newComment);
  };

  return (
    <div className="flex flex-col gap-8">
      <form
        className="w-full md:max-w-420 lg:max-w-450"
        onSubmit={handleSubmit}
      >
        <label
          className="pb-8 font-medium dark:text-white md:pb-10"
          htmlFor="content"
        >
          댓글
        </label>
        <div className="flex h-70 rounded-md border border-gray-200 p-12 selection:rounded-md focus:border-toss-blue dark:bg-gray-600 md:h-110">
          <textarea
            onChange={handleChange}
            id="content"
            value={content}
            placeholder="댓글을 입력해주세요"
            className="w-full resize-none rounded-md pr-3 text-12 outline-none placeholder:text-gray-300 dark:bg-gray-600 dark:text-white dark:placeholder:text-gray-200"
          />
          <button
            disabled={content.length < 1}
            className="relative left-4 top-23 h-28 w-84 rounded-4 border text-12 font-medium text-toss-blue disabled:text-gray-400 dark:disabled:text-gray-200 md:top-58 md:h-32 md:w-77"
            type="submit"
          >
            입력
          </button>
        </div>
      </form>
      <div className="custom-scrollbar h-60 min-h-58 w-full overflow-auto md:min-h-90">
        {loading && (
          <div className="flex h-50 items-center justify-center md:h-100 md:w-420 lg:w-450">
            <Spinner size={25} />
          </div>
        )}
        {!loading &&
          comments.length > 0 &&
          comments.map((comment) => (
            <Comment
              key={comment.id}
              commentData={comment}
              handleDelete={handleDeleteComment}
              handleModify={handleModifyComment}
            />
          ))}
        {!loading && comments.length === 0 && (
          <div className="flex h-50 items-center justify-center md:h-100 md:w-420 lg:w-450">
            <div className="w-35 md:w-60">
              <Image
                src="/image/empty-comment-logo.png"
                width={45}
                height={45}
                layout="responsive"
                alt="댓글 비었을 때 로고"
              />
            </div>
            <p className="pl-10 text-14 text-toss-blue-light md:text-16">
              첫 댓글을 남겨주세요!
            </p>
          </div>
        )}
        <div ref={commentsEnd} className="h-10" />
      </div>
    </div>
  );
}
