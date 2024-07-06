import { getDashboards, postDashboards } from '@/app/api/dashboards';
import ColorCircle from '@/components/commons/circle/ColorCircle';
import useDeviceState from '@/hooks/useDeviceState';
import {
  ColorMapping,
  Dashboard,
  DashboardFormValues,
  ModalState,
} from '@planit-types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '../button';
import Modal from '../modal';

const colorMapping: ColorMapping = {
  '#5534DA': 'bg-violet-dashboard',
  '#D6173A': 'bg-red-dashboard',
  '#7AC555': 'bg-green-dashboard',
  '#FFA500': 'bg-orange-dashboard',
  '#76A5EA': 'bg-blue-dashboard',
  '#E876EA': 'bg-pink-dashboard',
};

const colors = [
  '#D6173A',
  '#E876EA',
  '#FFA500',
  '#7AC555',
  '#5534DA',
  '#76A5EA',
];

export default function Sidemenu() {
  const device = useDeviceState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    message: '',
  });
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const router = useRouter();

  const pageSize = 18;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpenModal = () => {
    setModalState({ isOpen: true, message: '안녕하세요' });
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, isOpen: false });
    reset(); // 추가: 폼을 초기화하는 reset 함수 호출
  };

  const fetchDashboard = async (currentPage: number) => {
    const response = await getDashboards(
      'pagination',
      1,
      Number.MAX_SAFE_INTEGER,
    );

    const totalItemsCount = response.dashboards.length;
    setTotalItems(totalItemsCount);

    const calculatedTotalPages = Math.ceil(totalItemsCount / pageSize);
    setTotalPages(calculatedTotalPages);

    const sortedDashboards: Dashboard[] = response.dashboards.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    const paginatedDashboards = sortedDashboards.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize,
    );

    setDashboards(paginatedDashboards);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
    reset,
  } = useForm<DashboardFormValues>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<DashboardFormValues> = async (data) => {
    try {
      const formData: Dashboard = {
        title: data.dashboardName,
        color: selectedColor,
        id: 0,
        createdAt: '',
        updatedAt: '',
        createdByMe: false,
        userId: 0,
      };
      const response = await postDashboards(formData);

      const newDashboard: Dashboard = {
        id: response.id,
        title: response.title,
        color: response.color,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
        createdByMe: response.createdByMe,
        userId: response.userId,
      };
      fetchDashboard(1);
      setModalState({ ...modalState, isOpen: false });
      router.push(`/dashboard/${response.id}`);
    } catch (error) {
      console.error('Failed to create dashboard:', error);
    }
  };

  useEffect(() => {
    fetchDashboard(page);
  }, [page, device]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <>
      {!isMenuOpen && (
        <button
          type="button"
          className="fixed left-20 top-23 z-[1000] md:left-20 lg:left-20"
          onClick={toggleMenu}
        >
          <Image
            src="/icon/sidemenu-toggle.svg"
            width={20}
            height={20}
            alt="메뉴 열기"
          />
        </button>
      )}
      <nav
        className={`fixed left-0 top-0 z-[1001] h-screen w-70 max-w-[300px] overflow-y-auto border-r border-gray-200 bg-white pl-20 pt-20 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:w-[160px] lg:w-[300px]`}
      >
        <button
          type="button"
          className="absolute right-26 top-65 z-[1002] transform transition-transform duration-300 hover:scale-125 md:right-8 md:top-20 lg:right-20"
          onClick={toggleMenu}
        >
          <Image
            src="/icon/menu-toggle-close.svg"
            width={25}
            height={25}
            alt="메뉴 닫기"
          />
        </button>
        <Link href="/" className="cursor-pointer">
          <Image
            className="md:hidden"
            src="/image/logo_icon_blue.png"
            width={25}
            height={25}
            alt="사이드메뉴 모바일 로고"
          />
        </Link>
        <Link href="/" className="cursor-pointer sm:hidden md:block lg:block">
          <Image
            src="/image/logo_text_blue.png"
            className="mt-3"
            width={85}
            height={30}
            alt="사이드메뉴 로고"
          />
        </Link>
        <div className="ml-2 mt-60 flex items-center justify-between md:mt-50 md:pr-22 lg:pr-24">
          <p className="text-12 font-bold text-gray-400 sm:hidden md:block lg:block">
            Dash Boards
          </p>
          <button type="button" onClick={handleOpenModal}>
            <Image
              src="/icon/add_box.svg"
              width={20}
              height={20}
              alt="대쉬보드 추가 버튼"
            />
          </button>
        </div>
        <div
          className="no-scrollbar overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 150px)' }}
        >
          <ul className="mt-15 pr-10 md:mt-20 lg:pr-12">
            {dashboards.map((dashboard) => (
              <Link href={`/dashboard/${dashboard.id}`} key={dashboard.id}>
                <li className="flex h-45 items-center rounded-4 pl-8 hover:bg-violet-light-dashboard md:pl-10 lg:pl-12">
                  <ColorCircle
                    color={colorMapping[dashboard.color] || 'bg-gray-400'}
                    size="sm"
                  />
                  <div className="mr-6 text-18 font-medium text-gray-400 hover:text-black sm:hidden md:block md:max-w-[10ch] md:overflow-hidden md:text-ellipsis md:whitespace-nowrap md:pl-16 md:text-16 lg:block lg:max-w-none lg:whitespace-normal lg:pl-16">
                    {dashboard.title}
                  </div>
                  {dashboard?.createdByMe && (
                    <Image
                      className="mb-3 sm:hidden lg:block"
                      src="/icon/crown.svg"
                      width={15}
                      height={15}
                      alt="내가 만든 대시보드 표시"
                    />
                  )}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="absolute bottom-12 left-1 flex md:bottom-10 md:left-12">
          <button
            type="button"
            onClick={handlePreviousPage}
            disabled={page <= 1}
          >
            <Image
              src={
                page > 1
                  ? '/icon/dashboard-pagenation-left-black.svg'
                  : '/icon/dashboard-pagenation-left.svg'
              }
              width={40}
              height={40}
              alt="대시보드 왼쪽 화살표 버튼"
            />
          </button>
          <button
            type="button"
            onClick={handleNextPage}
            disabled={page >= totalPages}
          >
            <Image
              src={
                page < totalPages
                  ? '/icon/dashboard-pagenation-right-black.svg'
                  : '/icon/dashboard-pagenation-right.svg'
              }
              width={40}
              height={40}
              alt="대시보드 오른쪽 화살표 버튼"
            />
          </button>
        </div>
      </nav>
      <Modal isOpen={modalState.isOpen} onClose={handleCloseModal}>
        <div className="max-h-90vh md:max-h-95vh overflow-y-auto px-20 py-28 pt-32 md:w-540 md:px-28 md:pb-28">
          <p className="black-800 mb-24 text-24 font-bold lg:mb-28">
            새로운 대시보드
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="mb-10 text-18 font-medium">
              대시보드 이름
              <input
                {...register('dashboardName', {
                  required: '대시보드 이름은 필수 항목입니다.',
                  maxLength: {
                    value: 10,
                    message: '대시보드 이름은 공백 포함 10자 이내여야 합니다.',
                  },
                })}
                type="text"
                className={`mt-12 block h-42 w-full rounded-md border pl-16 pr-40 text-14 outline-none md:h-48 md:text-16 ${
                  errors.dashboardName ? 'border-red-dashboard' : ''
                }`}
              />
              {errors.dashboardName && (
                <span className="pt-8 text-14 text-red-500">
                  {errors.dashboardName.message}
                </span>
              )}
            </label>
            <div className="mt-24 flex space-x-10 md:mt-28">
              {colors.map((color) => (
                <div
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedColor(color);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  className="relative transform cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
                >
                  <ColorCircle color={colorMapping[color]} size="lg" />
                  {selectedColor === color && (
                    <Image
                      src="/icon/check-icon.svg"
                      width={15}
                      height={15}
                      alt="대시보드 색상 선택"
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-18 flex justify-end md:mt-28">
              <Button
                text="취소"
                type="button"
                cancel
                onClick={handleCloseModal}
                styles="h-42 md:h-48 py-10 px-54 text-16 md:py-14 md:text-18 md:px-46 md:py-10 mr-12"
              >
                취소
              </Button>
              <Button
                text="생성"
                type="submit"
                cancel={false}
                disabled={!watch('dashboardName') || !selectedColor}
                styles={`h-42 py-10 px-54 text-16 md:h-48 md:py-12 md:text-18 md:px-46 md:py-14 ${
                  !watch('dashboardName') || !selectedColor
                    ? 'bg-gray-300 cursor-not-allowed'
                    : ''
                }`}
              >
                생성
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
