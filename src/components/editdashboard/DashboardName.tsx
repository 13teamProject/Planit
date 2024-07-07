'use client';

import { getDashboradDetail, updateDashboard } from '@/app/api/dashboards';
import emitDashboards from '@/app/api/pusher/dashboards/emit';
import Button from '@/components/commons/button';
import ColorCircle from '@/components/commons/circle/ColorCircle';
import Input from '@/components/commons/input';
import { useAuthStore } from '@/store/authStore';
import { useDashboardNameChange } from '@/store/dashBoardName';
import { usePusherStore } from '@/store/pusherStore';
import {
  ColorMapping,
  DashboardEditRequest,
  DashboardEditResponse,
} from '@planit-types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function DashboardName({ params }: { params: { id: number } }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<DashboardEditRequest>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const [dashboardData, setDashboardData] = useState<DashboardEditResponse>();
  const { socketId } = usePusherStore();
  const { userInfo } = useAuthStore();
  const { setData } = useDashboardNameChange();

  const colorMapping: ColorMapping = {
    '#5534DA': 'bg-violet-dashboard',
    '#D6173A': 'bg-red-dashboard',
    '#7AC555': 'bg-green-dashboard',
    '#FFA500': 'bg-orange-dashboard',
    '#76A5EA': 'bg-blue-dashboard',
    '#E876EA': 'bg-pink-dashboard',
  };

  // 컬러 체크시
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const onSubmit: SubmitHandler<DashboardEditRequest> = async (data) => {
    if (selectedColor) {
      // 리퀘스트 정보에 맞게 설정
      const editRequest = { ...data, color: selectedColor };

      const result = await updateDashboard(params.id, editRequest);
      if ('message' in result) {
        toast.error(result.message);
      } else {
        toast.success('대시보드 정보를 수정했습니다');
        setData(result.title);
        setDashboardData(result);
        reset();
        await emitDashboards({
          member: userInfo?.nickname,
          action: 'edit',
          dashboard: data.title,
          roomId: String(dashboardData?.id),
          socketId: socketId as string,
        });
      }
    } else {
      // 색상 선택 안했을 때
      toast.error('색상을 선택해주세요.');
    }
  };

  useEffect(() => {
    const fetchDashboardDetail = async () => {
      const fetchedDashboard = await getDashboradDetail(params.id);

      if ('message' in fetchedDashboard) {
        toast.error(fetchedDashboard.message);
      } else {
        // 초기 컬러 설정
        setSelectedColor(fetchedDashboard.color);
        setDashboardData(fetchedDashboard);
      }
    };
    fetchDashboardDetail();
  }, []);

  return (
    <div className="w-full max-w-620 rounded-md bg-white px-28 pb-28 pt-32 dark:bg-gray-700">
      <form className="overflow-hidden" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-34 items-center justify-between md:flex">
          <div className="w-full md:max-w-320">
            <h3 className="line-clamp-1 text-20 font-bold">
              {dashboardData?.title}
            </h3>
          </div>
          <div className="mt-10 flex justify-end gap-5 md:mt-0 md:justify-normal md:gap-10">
            {Object.entries(colorMapping).map(([hexColor, tailwindClass]) => (
              <button
                type="button"
                key={hexColor}
                className="relative"
                onClick={() => handleColorSelect(hexColor)}
              >
                <p className="hidden">color</p>
                <ColorCircle color={tailwindClass} size="lg" />
                {selectedColor === hexColor && (
                  <Image
                    src="/icon/check.svg"
                    alt="대시보드 체크"
                    width={15}
                    height={11}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <label
          htmlFor="title"
          className="mb-10 inline-block text-16 dark:text-white md:text-18"
        >
          대시보드 이름
        </label>
        <Input
          id="title"
          type="text"
          placeholder="대시보드 이름을 적어주세요."
          size="sm"
          register={{ ...register('title', { required: true }) }}
        />
        <Button
          type="submit"
          text="변경"
          disabled={!isValid}
          styles="px-25 md:px-30 py-8 mt-24 text-12 md:text-14 float-right"
        />
      </form>
    </div>
  );
}
