import ProfileCircle from '@/components/commons/circle/ProfileCircle';
import { formatDate } from '@/utils/date';
import { Comment as CommentType } from '@planit-types';
import { ChangeEvent, useState } from 'react';

type Props = {
  commentData: CommentType;
  handleDelete: (commentId: number) => void;
  handleModify: (commentId: number, content: string) => void;
};

export default function Comment({
  commentData,
  handleDelete,
  handleModify,
}: Props) {
  const { id, content, createdAt, author } = commentData;

  const [modifiedContent, setModifiedContent] = useState(content);
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setModifiedContent(value);
  };

  const handleModifyButton = () => {
    handleModify(id, modifiedContent);
    setIsEdit(false);
  };

  return (
    <div className="flex w-full gap-8 pb-16 pt-2 md:max-w-420 lg:max-w-450">
      <ProfileCircle data={author} styles="size-26 md:size-34" />
      <div className="flex flex-col">
        <div>
          <span className="pr-6 text-12 font-semibold">{author.nickname}</span>
          <time className="text-10 text-gray-300">
            {formatDate(new Date(createdAt))}
          </time>
        </div>
        {!isEdit && <div className="text-12">{content}</div>}
        {isEdit && (
          <div className="mt-4 flex justify-between gap-4 rounded-md border border-gray-200 p-4 selection:rounded-md focus:border-toss-blue">
            <textarea
              onChange={handleChange}
              id="modifiedContent"
              value={modifiedContent}
              className="w-full resize-none rounded-md p-6 text-12 placeholder:text-gray-300 focus:outline-none"
            />
            <button
              disabled={modifiedContent.length < 1}
              className="relative right-2 top-18 h-28 w-84 rounded-4 border text-12 text-toss-blue disabled:text-gray-400"
              type="submit"
              onClick={handleModifyButton}
            >
              수정
            </button>
          </div>
        )}
        {!isEdit && (
          <div className="flex gap-8 pt-2 text-10 text-gray-300 underline underline-offset-2">
            <button type="button" onClick={() => setIsEdit((prev) => !prev)}>
              수정
            </button>
            <button type="button" onClick={() => handleDelete(id)}>
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
