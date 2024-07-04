import DashboardDeleteButton from '@/components/editdashboard/DashboardDeleteButton';
import DashboardInvitation from '@/components/editdashboard/DashboardInvitation';
import DashboardMember from '@/components/editdashboard/DashboardMember';
import DashboardName from '@/components/editdashboard/DashboardName';

export default function Edit({ params }: { params: { id: number } }) {
  return (
    <div>
      <DashboardName params={params} />
      <DashboardMember params={params} />
      <DashboardInvitation params={params} />
      <DashboardDeleteButton params={params} />
    </div>
  );
}
