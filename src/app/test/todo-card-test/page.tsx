'use client';

import BarButton from '@/components/commons/button/BarButton';
import TodoDetailModal from '@/components/dashboard/todo-detail-card/TodoDetailModal';
import { useState } from 'react';

export default function TodoDetailCard() {
  const [isTodoDetailsCardOpen, setIsTodoDetailsCardOpen] = useState(false);

  const openTodoDetailCardModal = () => {
    setIsTodoDetailsCardOpen(true);
  };

  const closeTodoDetailCardModal = () => {
    setIsTodoDetailsCardOpen(false);
  };

  return (
    <div className="m-auto mt-[40vh] w-1/5">
      <BarButton onClick={openTodoDetailCardModal} />
      <TodoDetailModal
        todoModalIsOpen={isTodoDetailsCardOpen}
        todoModalOnClose={closeTodoDetailCardModal}
      />
    </div>
  );
}
