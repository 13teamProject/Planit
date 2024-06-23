import DashBoardHeader from '@/components/mydashboard/DashboardHeader';
import Sidemenu from '@/components/mydashboard/Sidemenu';

export default function MyDashBoardPage() {
  return (
    <div className="flex">
      <Sidemenu />
      <DashBoardHeader />
    </div>
  );
}
