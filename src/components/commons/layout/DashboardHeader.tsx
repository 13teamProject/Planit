'use client';

import {
  getDashboardInvitation,
  getDashboards,
  postInvitation,
} from '@/app/api/dashboards';
import { getMembers } from '@/app/api/members';
import { getUsers } from '@/app/api/users';
import Button from '@/components/commons/button';
import DropDownSelectBox from '@/components/commons/dropdown';
import Input from '@/components/commons/input';
import Modal from '@/components/commons/modal';
import { PAGE_SIZE, SCROLL_SIZE } from '@/constants/globalConstants';
import { handleLogout } from '@/service/authService';
import { emailValidationSchema } from '@/utils/validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dashboard, EmailRequest, Invitation, Member } from '@planit-types';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import ProfileCircle from '../circle/ProfileCircle';

type User = {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
};

type ContentModalState = {
  isOpen: boolean;
  message: string;
  isContent?: boolean;
};

export default function DashBoardHeader({
  isDashboard,
}: {
  isDashboard: boolean;
}) {
  const [maxVisible, setMaxVisible] = useState(4);
  const [isExpanded, setIsExpanded] = useState(false);
  const [dashboardDetails, setDashboardDetails] = useState<Dashboard | null>(
    null,
  );
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [selectedDashboardId, setSelectedDashboardId] = useState<number | null>(
    null,
  );
  const [user, setUser] = useState<User | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [modalState, setModalState] = useState<ContentModalState>({
    isOpen: false,
    message: '',
  });
  const resolver = yupResolver(emailValidationSchema);
  const [invitationData, setInvitaionData] = useState<Invitation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailRequest>({ resolver, mode: 'onChange' });
  const [isClient, setIsClient] = useState(false);
  const { id } = useParams();
  const [selectBoxIsOpen, setSelectBoxIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchDashboards = async () => {
    const response = await getDashboards('pagination', 1, SCROLL_SIZE);
    setDashboards(response.dashboards);
    const currentDashboard = response.dashboards.find(
      (dashboard) => dashboard.id === Number(id),
    );
    if (currentDashboard) {
      setSelectedDashboardId(currentDashboard.id);
      setDashboardDetails(currentDashboard);
    }
  };

  // 모달 닫기
  const handleClose = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  // 초대 내역 조회
  const fetchDashboardInvitation = async (page: number) => {
    if (!selectedDashboardId) return;
    try {
      const fetchedDashboardInvitation = await getDashboardInvitation({
        dashboardId: selectedDashboardId,
        page,
        size: PAGE_SIZE,
      });
      if ('message' in fetchedDashboardInvitation) {
        console.error(fetchedDashboardInvitation.message);
      } else {
        setInvitaionData(fetchedDashboardInvitation.invitations);
        setTotalPages(
          Math.ceil(fetchedDashboardInvitation.totalCount / PAGE_SIZE),
        );
      }
    } catch (error) {
      console.error('Failed to fetch dashboard invitations:', error);
    }
  };

  // 초대하기 모달 열기
  const handleOpenInvitation = async () => {
    setModalState({ ...modalState, isOpen: true, isContent: true });
    await fetchDashboardInvitation(currentPage);
  };

  // 멤버 목록 조회
  const fetchMembers = async () => {
    if (!selectedDashboardId) return;
    const response = await getMembers({
      dashboardId: selectedDashboardId,
    });
    if ('message' in response) {
      console.error(response.message);
    } else {
      setMembers(response.members);
    }
  };

  // 초대하기
  const onSubmit: SubmitHandler<EmailRequest> = async (email) => {
    if (!selectedDashboardId) return;
    const response = await postInvitation(email, selectedDashboardId);
    if ('message' in response) {
      setModalState({ isOpen: true, message: response.message });
    } else {
      setModalState({ isOpen: true, message: '초대가 완료되었습니다.' });
      await fetchDashboardInvitation(currentPage);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDashboards();
    }
  }, [id]);

  useEffect(() => {
    fetchDashboardInvitation(currentPage);
    fetchMembers();
  }, [currentPage, selectedDashboardId]);

  useEffect(() => {
    const handleResize = () => {
      let newSize = 4;
      if (window.innerWidth < 744) {
        newSize = 2; // 모바일 (sm)
      } else if (window.innerWidth < 1200) {
        newSize = 2; // 태블릿 (md)
      } else {
        newSize = isExpanded ? members.length : 4; // PC (lg 이상)
      }
      setMaxVisible(newSize);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isExpanded, members.length]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUsers();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    }

    fetchUser();
  }, []);

  // Profile Circle toggle
  const toggleProfiles = () => {
    if (window.innerWidth >= 1200) {
      setIsExpanded(!isExpanded);
      setMaxVisible(!isExpanded ? members.length : 4);
    }
  };

  const visibleProfiles = members.slice(0, maxVisible);
  const extraCount = members.length - maxVisible;

  const logoutUser = () => {
    handleLogout();
    router.push('/');
  };

  const dropdownList = [
    {
      label: '마이페이지',
      onClick: () => {
        router.push('/mypage');
      },
    },
    { label: '로그아웃', onClick: logoutUser },
  ];

  return (
    <>
      <nav className="right-0 top-0 z-[998] flex h-70 w-full items-center justify-end border-1 border-l-0 border-b-gray-200 bg-white py-25 pr-12 md:pr-40 lg:justify-between lg:pe-80 lg:ps-40">
        {!isDashboard && (
          <p className="text-20 font-bold sm:hidden lg:block">내 대시보드</p>
        )}
        {isDashboard && (
          <div className="flex">
            <p className="mr-8 text-20 font-bold sm:hidden lg:block">
              {isClient && window.location.pathname.startsWith('/edit')
                ? '계정 관리'
                : dashboardDetails?.title}
            </p>
            {isClient &&
              dashboardDetails?.createdByMe &&
              !window.location.pathname.startsWith('/edit') && (
                <Image
                  className="sm:hidden lg:block"
                  src="/icon/crown.svg"
                  width={20}
                  height={20}
                  alt="내가 만든 대시보드 표시"
                />
              )}
          </div>
        )}
        <ul className="flex items-center">
          {isDashboard && dashboardDetails?.createdByMe && (
            <li className="pl-12">
              <Link href={`/edit/${selectedDashboardId}`}>
                <button
                  type="button"
                  className="flex h-40 w-88 items-center justify-center rounded-8 border-1 border-gray-200 text-16 font-medium text-gray-400 hover:border-black-700"
                >
                  <Image
                    src="/icon/settings.svg"
                    className="mr-8 sm:hidden md:block lg:block"
                    width={20}
                    height={20}
                    alt="관리 아이콘"
                  />
                  관리
                </button>
              </Link>
            </li>
          )}
          {isDashboard && (
            <li>
              <button
                type="button"
                className="ml-16 mr-16 flex h-40 w-116 items-center justify-center rounded-8 border-1 border-gray-200 text-16 font-medium text-gray-400 hover:border-black-700 md:mr-32 lg:mr-40"
                onClick={handleOpenInvitation}
              >
                <Image
                  src="/icon/add_box.svg"
                  className="mr-8 sm:hidden md:block lg:block"
                  width={20}
                  height={20}
                  alt="초대하기 아이콘"
                />
                초대하기
              </button>
            </li>
          )}
          {isDashboard && (
            <div className="flex font-semibold">
              {visibleProfiles.map((profile) => (
                <li key={profile.id} className="-mr-1">
                  <ProfileCircle
                    data={{
                      nickname: profile.nickname[0],
                      profileImageUrl: profile.profileImageUrl,
                    }}
                    styles="size-34 md:size-38 bg-orange-400"
                  />
                </li>
              ))}
              {extraCount > 0 && (
                <button
                  type="button"
                  onClick={toggleProfiles}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleProfiles();
                    }
                  }}
                  className="focus:outline-none"
                  aria-label="프로필 추가 버튼"
                >
                  <div className="flex size-34 transform cursor-pointer items-center justify-center rounded-full bg-pink-400 text-white ring-2 ring-white transition-transform duration-200 ease-in-out hover:scale-110 md:size-38">
                    +{extraCount}
                  </div>
                </button>
              )}
            </div>
          )}
          {isDashboard && (
            <div className="mx-12 h-38 border-l border-gray-200 md:mx-24 lg:mx-32" />
          )}
          <button
            ref={buttonRef}
            type="button"
            className="flex cursor-pointer items-center"
            onClick={() => setSelectBoxIsOpen((prev) => !prev)}
          >
            <li className="font-semibold">
              <ProfileCircle
                data={{
                  nickname: user?.nickname[0] || '',
                  profileImageUrl: user?.profileImageUrl || null,
                }}
                styles="size-34 md:size-38 bg-violet-dashboard"
              />
            </li>
            <li className="pl-12">
              {user && (
                <p className="text-16 font-medium sm:hidden md:block lg:block">
                  {user.nickname}
                </p>
              )}
            </li>
            {selectBoxIsOpen && (
              <span className="absolute right-20 top-60 md:right-36 md:top-63 lg:right-70">
                <DropDownSelectBox
                  items={dropdownList}
                  setSelectBoxIsOpen={setSelectBoxIsOpen}
                  exceptions={[buttonRef]}
                  size="lg"
                />
              </span>
            )}
          </button>
        </ul>
      </nav>
      <Modal isOpen={modalState.isOpen} onClose={handleClose}>
        <div className="m-auto px-54 pb-29 pt-26 text-right text-18 md:w-540 md:px-33">
          {modalState.isContent ? (
            <div className="text-left">
              <h3 className="mb-30 text-24 font-bold">초대하기</h3>
              <p className="mb-10 text-18">이메일</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  id="email"
                  type="text"
                  placeholder="이메일을 입력해 주세요"
                  size="lg"
                  register={{ ...register('email', { required: true }) }}
                  defaultValue="" // 기본값 설정
                  error={'email' in errors}
                />
                {errors.email && (
                  <span className="pt-8 text-14 text-red-500">
                    {errors.email.message}
                  </span>
                )}
                <div className="mt-28 flex justify-end gap-12">
                  <Button
                    text="취소"
                    onClick={handleClose}
                    styles="border !border-gray-200 !bg-white px-30 py-8 text-14 !text-toss-blue"
                  />
                  <Button
                    type="submit"
                    text="초대"
                    styles="px-30 py-8 text-14"
                  />
                </div>
              </form>
            </div>
          ) : (
            <>
              <p className="pb-47 pt-50 text-center">{modalState.message}</p>
              <span className="flex justify-center md:justify-end">
                <Button
                  styles="w-138 h-42 md:w-120 md:h-48"
                  text="확인"
                  onClick={handleClose}
                />
              </span>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
