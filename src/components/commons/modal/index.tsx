'use client';

import classNames from 'classnames';
import ReactDOM from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({
  isOpen,
  size = 'md',
  onClose,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // 배경 클릭 시 모달 닫기
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const modalClass = classNames(
    'rounded-8 relative w-full bg-white p-20 shadow-lg',
    {
      'max-w-lg': size === 'lg',
      'max-w-md': size === 'md',
      'max-w-sm': size === 'sm',
    },
  );

  return ReactDOM.createPortal(
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div className={modalClass}>{children}</div>
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  );
}
