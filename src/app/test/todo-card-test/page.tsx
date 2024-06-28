import { getTodoCardDetails } from '@/app/api/cards-server';
import CardDetails from '@/components/dashboard/todo-detail-card/CardDetails';
import CardTitle from '@/components/dashboard/todo-detail-card/CardTitle';
import CommentInput from '@/components/dashboard/todo-detail-card/CommentInput';
import CommentsList from '@/components/dashboard/todo-detail-card/CommentsList';

const boardId = '8684';

// 추후 설정 예정
// params: { boardId: string }
// const { boardId } = params;

export default async function TodoDetailCard() {
  const cardDetails = await getTodoCardDetails(boardId);

  return (
    <div className="flex w-full flex-col gap-16 px-28 py-32 md:max-w-680 lg:max-w-730">
      <CardTitle title={cardDetails.title} />
      <CardDetails data={cardDetails} />
      <CommentInput />
      <CommentsList />
    </div>
  );
}
