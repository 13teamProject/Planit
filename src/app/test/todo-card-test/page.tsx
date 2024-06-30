import { getTodoCardDetails } from '@/app/api/cards';
import CardDetails from '@/components/dashboard/todo-detail-card/CardDetails';
import CardTitle from '@/components/dashboard/todo-detail-card/CardTitle';
import CommentSection from '@/components/dashboard/todo-detail-card/CommentSection';

const boardId = '8684';

// 추후 설정 예정
// params: { boardId: string }
// const { boardId } = params;

export default async function TodoDetailCard() {
  const cardDetails = await getTodoCardDetails(boardId);
  const { title, id, columnId, dashboardId } = cardDetails;
  return (
    <div className="flex h-730 w-full flex-col gap-16 px-28 py-32 md:max-w-680 lg:max-w-730">
      <CardTitle title={title} />
      <CardDetails data={cardDetails} />
      <CommentSection
        cardId={id}
        columnId={columnId}
        dashboardId={dashboardId}
      />
    </div>
  );
}
