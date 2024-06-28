import ProfileCircle from '@/components/commons/circle/ProfileCircle';
import { formatDate } from '@/utils/date';

const mock = {
  cursorId: 0,
  comments: [
    {
      id: 1,
      content: '저는 두바이 쿠키 먹고 싶어요 제발',
      createdAt: '2024-06-27T05:01:47.639Z',
      updatedAt: '2024-06-27T05:01:47.639Z',
      cardId: 0,
      author: {
        profileImageUrl: '',
        nickname: '두바이왕자',
        id: 2,
      },
    },
    {
      id: 2,
      content: '카다이프? 그게 뭔가요?',
      createdAt: '2024-06-27T05:01:47.639Z',
      updatedAt: '2024-06-27T05:01:47.639Z',
      cardId: 0,
      author: {
        profileImageUrl: '',
        nickname: '두바이공주',
        id: 3,
      },
    },
    {
      id: 2,
      content: '카다이프? 그게 뭔가요?',
      createdAt: '2024-06-27T05:01:47.639Z',
      updatedAt: '2024-06-27T05:01:47.639Z',
      cardId: 0,
      author: {
        profileImageUrl: '',
        nickname: '두바이공주',
        id: 3,
      },
    },
  ],
};

export default function CommentsList() {
  return (
    <div>
      {mock.comments.map((comment) => (
        <div key={comment.id} className="flex gap-8 pb-16 pt-2">
          <ProfileCircle color="bg-red-500" size="sm">
            {comment.author.nickname[0]}
          </ProfileCircle>
          <div className="flex flex-col">
            <div className="flex gap-6">
              <span className="text-12 font-semibold">
                {comment.author.nickname}
              </span>
              <time className="text-10 text-gray-300">
                {formatDate(new Date(comment.createdAt))}
              </time>
            </div>
            <div className="text-12">{comment.content}</div>
            <div className="flex gap-8 pt-2 text-10 text-gray-300 underline underline-offset-2">
              <span>수정</span>
              <span>삭제</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
