'use client';

import DashboardDeleteButton from '@/components/editdashboard/DashboardDeleteButton';
import DashboardInvitation from '@/components/editdashboard/DashboardInvitation';
import DashboardMember from '@/components/editdashboard/DashboardMember';
import DashboardName from '@/components/editdashboard/DashboardName';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Edit({ params }: { params: { id: number } }) {
  const router = useRouter();
  return (
    <div>
      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-25 flex items-center"
        >
          <Image
            src="/icon/arrow_forward.svg"
            alt="뒤로가기"
            width={20}
            height={20}
            className="mr-5 rotate-180"
          />
          <span>돌아가기</span>
        </button>
      </div>
      <DashboardName params={params} />
      <DashboardMember params={params} />
      <DashboardInvitation params={params} />
      <DashboardDeleteButton params={params} />
    </div>
  );
}
