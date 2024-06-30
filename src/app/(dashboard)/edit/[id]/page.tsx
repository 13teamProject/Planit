import DashboardInvitation from '@/components/dashboard/edit/DashboardInvitation';
import DashboardMember from '@/components/dashboard/edit/DashboardMember';
import DashboardName from '@/components/dashboard/edit/DashboardName';

export default function Edit({ params }: { params: { id: number } }) {
  return (
    <div>
      <DashboardName params={params} />
      <DashboardMember params={params} />
      <DashboardInvitation params={params} />
    </div>
  );
}
