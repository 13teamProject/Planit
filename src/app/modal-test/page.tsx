'use client';

import Modal from '@/components/commons/modal';
import { useState } from 'react';

export default function ExampleComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="rounded bg-blue-500 px-10 py-5 text-white"
      >
        모달 열기
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="lg">
        <h2 className="mb-4 text-lg font-bold">모달 예시</h2>
        <p className="mb-4">비밀번호가 일치하지 않습니다.</p>
        <button
          onClick={closeModal}
          className="rounded bg-toss-blue px-4 py-2 text-white"
        >
          모달 닫기
        </button>
      </Modal>
    </div>
  );
}
