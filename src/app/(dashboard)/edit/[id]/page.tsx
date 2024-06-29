import DashboardName from '@/components/dashboard/Edit/DashboardName';

export default function Edit({ params }: { params: { id: string } }) {
  return (
    <div>
      <DashboardName params={params} />
    </div>
  );
}
