import DashboardMember from '@/components/dashboard/Edit/DashboardMember';
import DashboardName from '@/components/dashboard/Edit/DashboardName';

export default function Edit({ params }: { params: { id: number } }) {
  return (
    <div>
      <DashboardName params={params} />
      <DashboardMember params={params} />
    </div>
  );
}
