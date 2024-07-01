'use client';

import { postDashboards } from '@/app/api/dashboards';
import {
  getMyInivations,
  postInvitation,
  respondToInvitation,
} from '@/app/api/inivations';
import { DashboardFormData, EmailRequest, Invitation } from '@planit-types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Button from '../commons/button';

export default function InviteDashboard() {
  const isInvited = true;
  const [search, setSearch] = useState('');
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [filteredInvitations, setFilteredInvitations] = useState<Invitation[]>(
    [],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const fetchDashboardInvitations = async (size: number) => {
    const response = await getMyInivations(size);

    if ('message' in response) {
      console.error(response.message);
    } else {
      setInvitations(response.invitations);
    }
  };

  useEffect(() => {
    fetchDashboardInvitations(5); // 한 페이지당 5개의 초대 목록을 가져옴
  }, [currentPage]);

  useEffect(() => {
    // 검색어에 따라 초대 목록 필터링
    setFilteredInvitations(
      invitations.filter((invitation) =>
        invitation.dashboard.title.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, invitations]);

  // 초대 응답(수락)
  const handleInvitationResponse = async (
    invitationId: number,
    accept: boolean,
    dashboardData?: DashboardFormData,
  ) => {
    const response = await respondToInvitation(invitationId, accept);
    if ('message' in response) {
      console.error(response.message);
    } else {
      if (accept && dashboardData) {
        const createResponse = await postDashboards(dashboardData);
        if ('message' in createResponse) {
          console.error(createResponse.message);
        } else {
          console.log('Dashboard created successfully:', createResponse);
          fetchDashboardInvitations(5);
        }
      }
      fetchDashboardInvitations(5);
    }
  };

  const handleAddInvitation = async () => {
    const newEmail: EmailRequest = { email: 'yeon@naver.com' };
    const response = await postInvitation(newEmail, 10167);
    if ('message' in response) {
      console.error(response.message);
    } else {
      await fetchDashboardInvitations(5);
      console.log('post 성공');
    }
  };

  return (
    <>
      {isInvited && (
        <div className="mb-120 ml-40 mt-24 h-830 w-260 rounded-8 bg-white pl-24 pr-24 md:mt-40 md:h-600 md:w-504 md:pl-28 md:pr-28 lg:w-1022">
          <p className="pt-24 text-20 font-bold text-black-800 md:pt-32 md:text-24">
            초대받은 대시보드
          </p>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={onChange}
              placeholder="검색"
              className="mt-20 h-36 w-full pl-50 md:h-40"
            />
            <Image
              src="/icon/search.svg"
              width={24}
              height={24}
              alt="초대받은 대시보드 검색"
              className="absolute left-12 top-27 md:left-16 md:top-30"
            />
          </div>

          <Button
            text="새 초대 추가"
            type="button"
            cancel={false}
            styles="mt-4 mb-4"
            onClick={handleAddInvitation}
          >
            새 초대 추가
          </Button>

          <table className="mt-24 w-full table-fixed border-collapse">
            <thead className="sm:hidden md:table-header-group lg:table-header-group">
              <tr className="text-16 text-gray-300">
                <th className="w-1/3 px-4 py-2 text-left">이름</th>
                <th className="w-1/3 px-4 py-2 text-left">초대자</th>
                <th className="w-1/3 px-4 py-2 text-left">수락 여부</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvitations.map((invitation) => (
                <tr
                  key={invitation.id}
                  className="h-120 border-b-1 align-middle md:h-70 lg:h-72"
                >
                  <td className="w-1/3 px-4 py-2 align-middle">
                    {invitation.dashboard.title}
                  </td>
                  <td className="w-1/3 px-4 py-2 align-middle">
                    {invitation.inviter.nickname}
                  </td>
                  <td className="w-1/3 px-4 py-2 align-middle">
                    <div className="flex">
                      <Button
                        text="수락"
                        type="submit"
                        cancel={false}
                        styles="flex items-center justify-center w-109 h-28 md:w-72 md:h-35 lg:w-84 lg:h-40 text-16 md:text-18 mr-12"
                        onClick={() =>
                          handleInvitationResponse(invitation.id, true, {
                            title: invitation.dashboard.title,
                            color: invitation.dashboard.color, // 대시보드 색상 설정
                          })
                        }
                      >
                        수락
                      </Button>
                      <Button
                        text="거절"
                        type="button"
                        cancel
                        styles="flex items-center justify-center w-109 h-28 md:w-72 md:h-35 lg:w-84 lg:h-40 text-16 md:text-18 mr-12"
                        onClick={() =>
                          handleInvitationResponse(invitation.id, false)
                        }
                      >
                        거절
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!isInvited && (
        <div className="mb-120 ml-40 mt-24 h-400 w-260 rounded-8 bg-white md:mt-40 md:h-400 md:w-504 lg:w-1022">
          <p className="pl-16 pt-24 text-20 font-bold text-black-800 md:pl-28 md:pt-32 md:text-24">
            초대받은 대시보드
          </p>
          <div className="flex w-full flex-col items-center justify-center pt-100 md:pt-66">
            <Image
              src="/icon/unsubscribe.svg"
              width={100}
              height={100}
              alt="초대받은 대시보드가 없음 아이콘"
            />
            <p className="mt-16 text-14 text-gray-300 md:mt-24 md:text-18">
              아직 초대받은 대시보드가 없어요
            </p>
          </div>
        </div>
      )}
    </>
  );
}
