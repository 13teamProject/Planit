'use client';

import { getDashboradDetail, updateDashboard } from '@/app/api/dashboards';
import Button from '@/components/commons/button';
import ColorCircle from '@/components/commons/circle/ColorCircle';
import Input from '@/components/commons/input';
import Modal from '@/components/commons/modal';
import {
  ColorMapping,
  DashboardEditRequest,
  DashboardEditResponse,
  ModalState,
} from '@planit-types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function DashboardName({ params }: { params: { id: string } }) {
  const { register, handleSubmit, reset } = useForm<DashboardEditRequest>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const [dashboardData, setDashboardData] = useState<DashboardEditResponse>();
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    message: '',
  });
  const colorMapping: ColorMapping = {
    '#7AC555': 'bg-green-dashboard',
    '#5534DA': 'bg-violet-dashboard',
    '#FFA500': 'bg-orange-dashboard',
    '#76A5EA': 'bg-blue-dashboard',
    '#E876EA': 'bg-pink-dashboard',
  };

  // 컬러 체크시
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  // 모달 닫기
  const handleClose = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const onSubmit: SubmitHandler<DashboardEditRequest> = async (data) => {
    if (selectedColor) {
      // 리퀘스트 정보에 맞게 설정
      const editRequest = { ...data, color: selectedColor };

      const result = await updateDashboard(params.id, editRequest);

      if ('message' in result) {
        setModalState({ isOpen: true, message: result.message });
      } else {
        setModalState({
          isOpen: true,
          message: '대시보드 정보를 수정했습니다.',
        });
        setDashboardData(result);
        reset();
      }
    } else {
      // 색상 선택 안했을 때
      setModalState({ isOpen: true, message: '색상을 선택해주세요.' });
    }
  };

  useEffect(() => {
    const fetchDashboardDetail = async () => {
      const fetchedDashboard = await getDashboradDetail(params.id);

      if ('message' in fetchedDashboard) {
        setModalState({ isOpen: true, message: fetchedDashboard.message });
      } else {
        // 초기 컬러 설정
        setSelectedColor(fetchedDashboard.color);
        setDashboardData(fetchedDashboard);
      }
    };
    fetchDashboardDetail();
  }, []);

  return (
    <div className="w-full max-w-620 rounded-md bg-white px-28 pb-28 pt-32">
      <form className="overflow-hidden" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-34 flex items-center justify-between">
          <h3 className="text-20 font-bold">{dashboardData?.title}</h3>
          <div className="flex gap-10">
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

        <label htmlFor="title" className="mb-10 inline-block text-18">
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
          styles="px-30 py-8 mt-24 text-14 float-right"
        />
      </form>

      <Modal isOpen={modalState.isOpen} onClose={handleClose}>
        <div className="m-auto px-54 pb-29 pt-26 text-right text-18 md:w-540 md:px-33">
          <p className="pb-47 pt-50 text-center">{modalState.message}</p>
          <span className="flex justify-center md:justify-end">
            <Button
              styles="w-138 h-42 md:w-120 md:h-48"
              text="확인"
              onClick={handleClose}
            />
          </span>
        </div>
      </Modal>
    </div>
  );
}
