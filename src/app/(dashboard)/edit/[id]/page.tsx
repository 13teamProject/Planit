import DashboardMember from '@/components/dashboard/edit/DashboardMember';
import DashboardName from '@/components/dashboard/edit/DashboardName';

export default function Edit({ params }: { params: { id: number } }) {
  return (
    <div>
      <DashboardName params={params} />
      <DashboardMember params={params} />
    </div>
  );
}
