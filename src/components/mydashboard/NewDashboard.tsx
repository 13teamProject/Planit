'use client';

import { getDashboards, postDashboards } from '@/app/api/dashboards';
import ColorCircle from '@/components/commons/circle/ColorCircle';
import { useDarkMode } from '@/context/DarkModeContext';
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

import Button from '../commons/button';
import BarButton from '../commons/button/BarButton';
import Modal from '../commons/modal';

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

export default function NewDashboard() {
  const { darkMode } = useDarkMode();
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [page, setPage] = useState(1);
  const deviceState = useDeviceState();
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    message: '',
  });
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const [totalItems, setTotalItems] = useState<number>(0); // 전체 아이템 수
  const [totalPages, setTotalPages] = useState<number>(1); // 전체 페이지 수
  const router = useRouter();

  const pageSize = 5; // 한 페이지당 아이템 수

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

  const handleOpenModal = () => {
    setModalState({ isOpen: true, message: '' });
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, isOpen: false });
    reset(); // 추가: 폼을 초기화하는 reset 함수 호출
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, errors },
  } = useForm<DashboardFormValues>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<DashboardFormValues> = async (data) => {
    try {
      const formData = {
        title: data.dashboardName,
        color: selectedColor,
      } as Dashboard;
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
  }, [page]);

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
      <section className="mb-8 ml-40 mt-40 grid w-260 grid-cols-1 grid-rows-6 gap-y-8 md:mb-10 md:w-504 md:grid-cols-2 md:grid-rows-3 md:gap-x-10 md:gap-y-10 lg:mb-12 lg:w-1022 lg:grid-cols-3 lg:grid-rows-2 lg:gap-x-13 lg:gap-y-12">
        <div className="col-span-1 col-start-1 row-span-1 row-start-1">
          <BarButton
            onClick={handleOpenModal}
            text="새로운 대시보드"
            size={deviceState === 'mobile' ? 'sm' : 'lg'}
          />
        </div>
        {dashboards &&
          dashboards.map((dashboard) => (
            <div
              key={dashboard.id}
              className="col-span-1 col-start-auto row-span-1 row-start-auto"
            >
              <Link href={`/dashboard/${dashboard.id}`}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-8 rounded-8 border border-gray-200 bg-white px-20 py-20 font-bold text-black-800 hover:border-gray-400 dark:bg-gray-700 dark:text-white md:py-24 md:text-18"
                >
                  <div className="flex items-center">
                    <ColorCircle
                      color={colorMapping[dashboard.color] || 'bg-gray-400'}
                      size="sm"
                    />
                    <p className="ml-10 text-ellipsis">{dashboard.title}</p>
                  </div>
                  <Image
                    src={
                      darkMode
                        ? '/icon/arrow_forward_gray.svg'
                        : '/icon/arrow_forward.svg'
                    }
                    width={20}
                    height={20}
                    alt="대쉬보드 바로가기 버튼"
                  />
                </button>
              </Link>
            </div>
          ))}
      </section>
      <section className="ml-40 flex w-260 items-center justify-end md:w-504 lg:w-1022">
        <p className="black-800 mr-12 text-14 font-normal md:mr-16">
          {totalPages} 페이지 중 {page}
        </p>
        <button type="button" onClick={handlePreviousPage}>
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
        <button type="button" onClick={handleNextPage}>
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
      </section>
      <Modal isOpen={modalState.isOpen} onClose={handleCloseModal}>
        <div className="max-h-90vh md:max-h-95vh overflow-y-auto px-20 py-28 pt-32 md:w-540 md:px-28 md:pb-28">
          <p className="black-800 mb-24 text-24 font-bold dark:text-white lg:mb-28">
            새로운 대시보드
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="mb-10 text-18 font-medium dark:text-gray-200">
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
