'use client';

import { getMembers } from '@/app/api/members';
import Button from '@/components/commons/button';
import ProfileCircle from '@/components/commons/circle/ProfileCircle';
import Modal from '@/components/commons/modal';
import { Member, ModalState } from '@planit-types';
import { useEffect, useState } from 'react';

export default function DashboardMember({
  params,
}: {
  params: { id: number };
}) {
  const [members, setMembers] = useState<Member[]>([]);
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    message: '',
  });

  // 모달 닫기
  const handleClose = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  useEffect(() => {
    const fetchDashboardMember = async () => {
      const fetchedDashboardMember = await getMembers({
        dashboardId: params.id,
      });

      if ('message' in fetchedDashboardMember) {
        setModalState({
          isOpen: true,
          message: fetchedDashboardMember.message,
        });
      } else {
        setMembers(fetchedDashboardMember.members);
      }
    };
    fetchDashboardMember();
  });
  return (
    <div className="mt-12 w-full max-w-620 rounded-md bg-white px-28 pb-28 pt-26">
      <div className="mb-25">
        <h3 className="text-24 font-bold">구성원</h3>
      </div>
      <p className="mb-8 text-gray-300">이름</p>
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
              styles="size-34 md:size-38 bg-violet-dashboard"
            />
            <p className="text-black-800">{member.nickname}</p>
          </div>
          <Button
            text="삭제"
            styles="px-30 py-8 border text-14 !border-gray-200 !bg-white !text-toss-blue"
          />
        </div>
      ))}

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
