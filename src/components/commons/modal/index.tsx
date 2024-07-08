'use client';

import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isAuth?: boolean;
  children: React.ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  isAuth = false,
  children,
}: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // 배경 클릭 시 모달 닫기
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isOpen || !isMounted) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
      onKeyDown={handleKeyDown}
      role="presentation"
    >
      <div
        className={`relative rounded-8 bg-white shadow-lg ${isAuth ? 'dark:bg-gray-700' : ''}`}
      >
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  );
}
