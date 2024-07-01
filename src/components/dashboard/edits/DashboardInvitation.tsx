'use client';

import {
  deleteInvitation,
  getDashboardInvitation,
  postInvitation,
} from '@/app/api/dashboards';
import Button from '@/components/commons/button';
import Input from '@/components/commons/input';
import Modal from '@/components/commons/modal';
import { PAGE_SIZE } from '@/constants/globalConstants';
import { emailValidationSchema } from '@/utils/validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { EmailRequest, Invitation } from '@planit-types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type ContentModalState = {
  isOpen: boolean;
  message: string;
  isContent?: boolean;
};

export default function DashboardInvitation({
  params,
}: {
  params: { id: number };
}) {
  const [invitationData, setInvitaionData] = useState<Invitation[]>([]);
  const [modalState, setModalState] = useState<ContentModalState>({
    isOpen: false,
    message: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const resolver = yupResolver(emailValidationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailRequest>({
    resolver,
    mode: 'onChange',
  });

  // 모달 닫기
  const handleClose = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  // 초대하기 모달 열기
  const handleOpenInvitation = () => {
    setModalState({ ...modalState, isOpen: true, isContent: true });
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

  // 초대 내역 조회
  const fetchDashboardInvitation = async (page: number) => {
    const fetchedDashboardInvitation = await getDashboardInvitation({
      dashboardId: params.id,
      page,
      size: PAGE_SIZE,
    });
    if ('message' in fetchedDashboardInvitation) {
      setModalState({
        isOpen: true,
        message: fetchedDashboardInvitation.message,
      });
    } else {
      setInvitaionData(fetchedDashboardInvitation.invitations);
      setTotalPages(
        Math.ceil(fetchedDashboardInvitation.totalCount / PAGE_SIZE),
      );
    }
  };

  // 초대하기
  const onSubmit: SubmitHandler<EmailRequest> = async (email) => {
    const response = await postInvitation(email, params.id);

    if ('message' in response) {
      setModalState({ isOpen: true, message: response.message });
    } else {
      setModalState({
        isOpen: true,
        message: '초대가 완료되었습니다.',
      });
      await fetchDashboardInvitation(currentPage);
    }
  };

  // 초대 취소 핸들러
  const handleCancelInvitation = async (invitationId: number) => {
    const successDeleteMember = await deleteInvitation(invitationId, params.id);

    if ('message' in successDeleteMember) {
      setModalState({
        isOpen: true,
        message: successDeleteMember.message,
      });
    } else {
      // 구성원 목록에서 해당 유저 삭제후 리스트업
      await fetchDashboardInvitation(currentPage);
      setModalState({
        isOpen: true,
        message: '초대 취소가 완료되었습니다.',
      });
    }
  };

  useEffect(() => {
    fetchDashboardInvitation(currentPage);
  }, [currentPage]);

  return (
    <div className="mt-12 w-full max-w-620 rounded-md bg-white px-28 pb-28 pt-26">
      <div className="mb-25 flex items-center justify-between">
        <h3 className="text-20 font-bold md:text-24">초대 내역</h3>
        <div className="flex items-center gap-12 md:gap-16">
          <span className="text-12 md:text-14">
            {totalPages} 페이지 중 {currentPage}
          </span>
          <div className="flex items-center">
            <button
              type="button"
              className="rounded-s-md border border-gray-200 px-12 py-9 md:px-14 md:py-11"
              onClick={handlePrevPage}
              disabled={currentPage <= 1} // 첫 번째 페이지면 disabled=true
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
              disabled={currentPage >= totalPages} // 현재 페이지가 마지막 페이지면 true
            >
              <Image
                src="/icon/arrow_next.svg"
                alt="arrow_next"
                width={8}
                height={13}
              />
            </button>
          </div>
          <Button
            text="초대하기"
            onClick={handleOpenInvitation}
            styles="px-12 py-7 md:px-16 md:py-8 text-12 md:text-14"
          />
        </div>
      </div>
      <p className="mb-8 text-gray-300">이메일</p>
      {invitationData.map((invitation) => (
        <div
          key={invitation.id}
          className="flex items-center justify-between border-b border-gray-100 py-16"
        >
          <div className="flex items-center gap-12">
            <p>{invitation.invitee.email}</p>
          </div>
          <Button
            text="취소"
            onClick={() => handleCancelInvitation(invitation.id)}
            styles="px-30 py-8 border text-14 !border-gray-200 !bg-white !text-toss-blue"
          />
        </div>
      ))}

      <Modal isOpen={modalState.isOpen} onClose={handleClose}>
        <div className="m-auto w-330 px-20 pb-29 pt-26 text-right text-18 md:w-540 md:px-33">
          {modalState.isContent ? (
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
                    styles="px-30 py-8 text-14  basis-1/2 md:basis-auto "
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
    </div>
  );
}
