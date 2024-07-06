'use client';

import { getDashboradDetail, postInvitation } from '@/app/api/dashboards';
import { getMembers } from '@/app/api/members';
import Button from '@/components/commons/button';
import DropDownSelectBox from '@/components/commons/dropdown';
import Input from '@/components/commons/input';
import Modal from '@/components/commons/modal';
import { handleLogout } from '@/service/authService';
import { useAuthStore } from '@/store/authStore';
import { useDashboardNameChange } from '@/store/dashBoardName';
import { emailValidationSchema } from '@/utils/validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dashboard, EmailRequest, Member } from '@planit-types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import ProfileCircle from '../circle/ProfileCircle';

type ContentModalState = {
  isOpen: boolean;
  message: string;
  isContent?: boolean;
};

export default function DashBoardHeader({
  isDashboard,
  params,
}: {
  isDashboard: boolean;
  params?: { id: string };
}) {
  const router = useRouter();
  const { userInfo } = useAuthStore();
  const resolver = yupResolver(emailValidationSchema);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // state
  const [selectBoxIsOpen, setSelectBoxIsOpen] = useState(false);
  const [maxVisible, setMaxVisible] = useState(4);
  const [isExpanded, setIsExpanded] = useState(false);
  const [dashboards, setDashboards] = useState<Dashboard>();
  const [selectedDashboardId] = useState<number>(params ? +params.id : 0);
  const [members, setMembers] = useState<Member[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { dashboardName, setData } = useDashboardNameChange();
  const [modalState, setModalState] = useState<ContentModalState>({
    isOpen: false,
    message: '',
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmailRequest>({ resolver, mode: 'onChange' });

  // 대시보드 정보 불러오기
  const fetchDashboards = async () => {
    const response = await getDashboradDetail(selectedDashboardId);
    if ('message' in response) {
      toast.error(response.message);
    } else {
      setDashboards(response);
      setData(response.title);
    }
  };

  // 모달 닫기
  const handleClose = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  // 초대하기 모달 열기
  const handleOpenInvitation = async () => {
    setModalState({ ...modalState, isOpen: true, isContent: true });
  };

  // 초대하기
  const onSubmit: SubmitHandler<EmailRequest> = async (email) => {
    if (!selectedDashboardId) return;

    const response = await postInvitation(email, selectedDashboardId);

    if ('message' in response) {
      toast.error(response.message);
    } else {
      toast.success('초대가 완료되었습니다.');
      handleClose();
    }
  };

  // 멤버 목록 조회
  const fetchMembers = async () => {
    if (!selectedDashboardId) return;
    const response = await getMembers({
      dashboardId: selectedDashboardId,
    });
    if ('message' in response) {
      toast.error(response.message);
    } else {
      const memberprofile = response.members.filter(
        (data) => data.userId !== userInfo?.id,
      );
      setMembers(memberprofile);
    }
  };

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
  useEffect(() => {
    if (isDashboard) {
      fetchDashboards();
      fetchMembers();
    }
    setIsClient(true);
  }, [selectedDashboardId]);

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

  return (
    <>
      <nav className="right-0 top-0 z-[998] flex h-70 w-full items-center justify-end border-1 border-l-0 border-b-gray-200 bg-white py-25 pr-12 md:pr-40 lg:justify-between lg:pe-80 lg:ps-40">
        {!isDashboard && isClient && (
          <p className="ml-30 text-20 font-bold sm:hidden lg:block">
            {window.location.pathname.startsWith('/mypage')
              ? '계정 관리'
              : '내 대시보드'}
          </p>
        )}
        {isDashboard && (
          <div className="flex">
            {isClient && (
              <p className="ml-30 mr-8 text-20 font-bold sm:hidden lg:block">
                {dashboardName}
              </p>
            )}
            {isClient && dashboards?.createdByMe && (
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
          {isDashboard &&
            dashboards?.createdByMe &&
            !window.location.pathname.startsWith('/edit') && (
              //
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
          {isDashboard &&
            dashboards?.createdByMe &&
            !window.location.pathname.startsWith('/edit') && (
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
            <>
              <div className="flex font-semibold">
                {visibleProfiles.map((profile) => (
                  <li key={profile.id} className="-mr-6">
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
              <div className="mx-12 h-38 border-l border-gray-200 md:mx-24 lg:mx-32" />
            </>
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
                  nickname: userInfo?.nickname[0] || '',
                  profileImageUrl: userInfo?.profileImageUrl || null,
                }}
                styles="size-34 md:size-38 bg-violet-dashboard"
              />
            </li>
            <li className="pl-12">
              {userInfo && (
                <p className="text-16 font-medium sm:hidden md:block lg:block">
                  {userInfo.nickname}
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
        <div className="m-auto w-330 px-20 pb-29 pt-26 text-right text-18 md:w-540 md:px-33">
          <div className="text-left">
            <h3 className="mb-24 text-20 font-bold md:mb-30 md:text-24">
              초대하기
            </h3>
            <p className="mb-10 text-16 md:text-18">이메일</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                id="email"
                type="text"
                placeholder="이메일을 입력해 주세요"
                size="lg"
                register={{ ...register('email', { required: true }) }}
                error={'email' in errors}
              />
              <span
                className={`pt-8 text-14 text-red-500 ${errors.email?.message ? 'block' : 'hidden'}`}
              >
                {errors.email?.message}
              </span>
              <div className="mt-24 flex justify-end gap-12 md:mt-28">
                <Button
                  text="취소"
                  onClick={handleClose}
                  styles="border !border-gray-200 !bg-white basis-1/2 md:basis-auto px-30 py-8 text-14 !text-toss-blue"
                />
                <Button
                  type="submit"
                  text="초대"
                  disabled={!isValid}
                  styles="px-30 py-8 text-14  basis-1/2 md:basis-auto "
                />
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
