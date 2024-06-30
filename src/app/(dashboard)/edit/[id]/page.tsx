import DashboardMember from '@/components/dashboard/edits/DashboardMember';
import DashboardName from '@/components/dashboard/edits/DashboardName';

export default function Edit({ params }: { params: { id: number } }) {
  return (
    <div>
      <DashboardName params={params} />
      <DashboardMember params={params} />
    </div>
  );
}
