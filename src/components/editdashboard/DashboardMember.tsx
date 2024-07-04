'use client';

import { deleteMember, getMembers } from '@/app/api/members';
import Button from '@/components/commons/button';
import ProfileCircle from '@/components/commons/circle/ProfileCircle';
import { PAGE_SIZE } from '@/constants/globalConstants';
import { Member } from '@planit-types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function DashboardMember({
  params,
}: {
  params: { id: number };
}) {
  const [members, setMembers] = useState<Member[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 구성원 삭제
  const handleDeleteMember = async (memberId: number) => {
    const successDeleteMember = await deleteMember(memberId);

    if ('message' in successDeleteMember) {
      toast.error(successDeleteMember.message);
    } else {
      // 구성원 목록에서 해당 유저 삭제후 리스트업
      await fetchDashboardMember(currentPage);
      toast.success('구성원 삭제가 완료되었습니다.');
    }
  };

  // 이전 페이지
  const handlePrevPage = () => {
    // 현재 페이지 값을 가져와서 -1 함 (계산된 값과 1을 비교해서 더 큰 값을 가져옴 = 음수 값으로 가지 않기 위해)
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // 다음 페이지
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const fetchDashboardMember = async (page: number) => {
    const fetchedDashboardMember = await getMembers({
      dashboardId: params.id,
      page,
      size: PAGE_SIZE,
    });
    if ('message' in fetchedDashboardMember) {
      toast.error(fetchedDashboardMember.message);
    } else {
      setMembers(fetchedDashboardMember.members);
      setTotalPages(Math.ceil(fetchedDashboardMember.totalCount / PAGE_SIZE));
    }
  };

  useEffect(() => {
    // 구성원 조회 함수 호출
    fetchDashboardMember(currentPage);
  }, [currentPage]);

  return (
    <div className="mt-12 w-full max-w-620 rounded-md bg-white px-28 pb-28 pt-26">
      <div className="mb-25 flex justify-between">
        <h3 className="text-20 font-bold md:text-24">구성원</h3>
        <div className="flex items-center">
          <span className="mr-16 text-12 md:text-14">
            {totalPages} 페이지 중 {currentPage}
          </span>

          <button
            type="button"
            className="rounded-s-md border border-gray-200 px-12 py-9 md:px-14 md:py-11"
            onClick={handlePrevPage}
            disabled={currentPage === 1} // 첫 번째 페이지면 disabled=true
          >
            <Image
              src="/icon/arrow_prev.svg"
              alt="arrow_prev"
              width={8}
              height={13}
            />
          </button>
          <button
            type="button"
            className="rounded-e-md border border-gray-200 px-12 py-9 md:px-14 md:py-11"
            onClick={handleNextPage}
            disabled={currentPage === totalPages} // 현재 페이지가 마지막 페이지면 true
          >
            <Image
              src="/icon/arrow_next.svg"
              alt="arrow_next"
              width={8}
              height={13}
              className="fill-gray-300"
            />
          </button>
        </div>
      </div>
      <p className="mb-8 text-14 text-gray-300 md:text-16">이름</p>
      {members.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between border-b border-gray-100 py-16"
        >
          <div className="flex items-center gap-12">
            <ProfileCircle
              data={{
                profileImageUrl: member.profileImageUrl,
                nickname: member.nickname,
              }}
              styles="size-34 md:size-38"
            />
            <p className="md:text- 16 text-14 text-black-800">
              {member.nickname}
            </p>
          </div>
          <Button
            text="삭제"
            onClick={() => handleDeleteMember(member.id)}
            styles="px-15 py-7 md:px-30 md:py-8 border text-12 md:text-14  !border-gray-200 !bg-white !text-toss-blue"
          />
        </div>
      ))}
    </div>
  );
}
