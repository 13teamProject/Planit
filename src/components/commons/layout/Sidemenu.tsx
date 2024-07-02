import { getDashboards, postDashboards } from '@/app/api/dashboards';
import ColorCircle from '@/components/commons/circle/ColorCircle';
import { SCROLL_SIZE } from '@/constants/globalConstants';
import {
  ColorMapping,
  Dashboard,
  DashboardFormValues,
  DashboardResponse,
  ModalState,
} from '@planit-types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '../button';
import Modal from '../modal';

export const colorMapping: ColorMapping = {
  '#5534DA': 'bg-violet-dashboard',
  '#D6173A': 'bg-red-dashboard',
  '#7AC555': 'bg-green-dashboard',
  '#FFA500': 'bg-orange-dashboard',
  '#76A5EA': 'bg-blue-dashboard',
  '#E876EA': 'bg-pink-dashboard',
};

export const colors = [
  '#D6173A',
  '#E876EA',
  '#FFA500',
  '#7AC555',
  '#5534DA',
  '#76A5EA',
];

export default function Sidemenu() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    message: '',
  });
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const [page, setPage] = useState<number>(1);

  const fetchDashboard = async () => {
    const response = await getDashboards('infiniteScroll', 1, SCROLL_SIZE);
    setDashboards(
      response.dashboards.map((data: DashboardResponse) => ({
        id: data.id,
        title: data.title,
        color: data.color,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        createdByMe: data.createdByMe,
        userId: data.userId,
      })),
    );
  };

  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<DashboardFormValues>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<DashboardFormValues> = async (data) => {
    try {
      const formData = {
        title: data.dashboardName,
        color: selectedColor,
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

      fetchDashboard();
      setModalState({ ...modalState, isOpen: false });
      router.push(`/dashboard/${response.id}`);
    } catch (error) {
      console.error('Failed to create dashboard:', error);
    }
  };

  const handleOpenModal = () => {
    setModalState({ isOpen: true, message: '안녕하세요' });
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <>
      <nav className="left-0 top-0 z-[999] h-screen w-67 overflow-y-auto border-1 border-r-gray-200 bg-white pl-20 pt-20 md:w-160 md:pl-18 lg:w-300 lg:pl-24">
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
        <div className="mt-50 flex items-center justify-between lg:pr-24">
          <p className="text-12 font-bold text-gray-400 sm:hidden md:block lg:block">
            Dash Boards
          </p>
          <button type="button" onClick={handleOpenModal} className="md:pr-10">
            <Image
              src="/icon/add_box.svg"
              width={20}
              height={20}
              alt="대쉬보드 추가 버튼"
            />
          </button>
        </div>

        <div
          className="overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 150px)' }}
        >
          <ul className="mt-20 pr-10 lg:pr-12">
            {dashboards.map((dashboard) => (
              <li
                key={dashboard.id}
                className="flex h-45 items-center rounded-4 pl-8 hover:bg-violet-light-dashboard md:pl-10 lg:pl-12"
              >
                <ColorCircle
                  color={colorMapping[dashboard.color] || 'bg-gray-400'}
                  size="sm"
                />
                <Link
                  href={`/dashboard/${dashboard.id}`}
                  className="text-18 font-medium text-gray-400 hover:text-black sm:hidden md:block md:pl-16 md:text-16 lg:block lg:pl-16"
                >
                  {dashboard.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <Modal isOpen={modalState.isOpen} onClose={handleCloseModal}>
        <div className="h-300 w-327 px-20 py-28 pt-32 md:h-334 md:w-540 md:px-28 md:pb-28">
          <p className="black-800 mb-24 text-24 font-bold lg:mb-32">
            새로운 대시보드
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="mb-10 text-18 font-medium">
              대시보드 이름
              <input
                {...register('dashboardName', { required: 'true' })}
                type="text"
                className="block h-42 w-full rounded-md border pl-16 pr-40 text-14 outline-none md:h-48 md:text-16"
              />
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
