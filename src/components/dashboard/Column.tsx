import { editCard, getCards } from '@/app/api/cards';
import { getColumns } from '@/app/api/columns';
import BarButton from '@/components/commons/button/BarButton';
import ColorCircle from '@/components/commons/circle/ColorCircle';
import { useAuthStore } from '@/store/authStore';
import { useSocketStore } from '@/store/socketStore';
import {
  Column as ColumnType,
  EditCardRequest,
  GetCardResponse,
} from '@planit-types';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Spinner from '../commons/spinner';
import Card from './Card';
import ColumnSettingButton from './ColumnSettingButton';
import CreateCardModal from './modals/CreateCardModal';
import TodoDetailModal from './modals/TodoDetailModal';

type ColumnProps = {
  dashboardId: number;
  onColumnUpdate: () => void;
};

type ColumnWithCards = ColumnType & {
  cards: GetCardResponse[];
};

export default function Column({ dashboardId, onColumnUpdate }: ColumnProps) {
  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);
  const [isEditColumnModalOpen, setIsEditColumnModalOpen] = useState<{
    [key: number]: boolean;
  }>({});
  const [columns, setColumns] = useState<ColumnWithCards[]>([]);
  const [activeColumnId, setActiveColumnId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [draggingCard, setDraggingCard] = useState<number | null>(null);
  const [dropTarget, setDropTarget] = useState<{
    columnId: number;
    index: number;
  } | null>(null);
  const [selectedCard, setSelectedCard] = useState<GetCardResponse | null>(
    null,
  );
  const [selectedColumnTitle, setSelectedColumnTitle] = useState<string>('');
  const [isTodoDetailsCardOpen, setIsTodoDetailsCardOpen] = useState(false);
  const { socket } = useSocketStore();
  const { userInfo } = useAuthStore();

  const socketListener = () => {
    if (!socket) return;

    socket.on('card', (message: string) => {
      if (message.includes('삭제')) {
        toast.error(message, { containerId: 'socket' });
      } else {
        toast.success(message, { containerId: 'socket' });
      }

      fetchColumnsAndCards();
    });

    socket.on('column', (message: string) => {
      if (message.includes('삭제')) {
        toast.error(message, { containerId: 'socket' });
      } else {
        toast.success(message, { containerId: 'socket' });
      }

      fetchColumnsAndCards();
    });
  };

  useEffect(() => {
    socketListener();
  }, [socket]);

  const openTodoDetailCardModal = (
    card: GetCardResponse,
    columnTitle: string,
  ) => {
    setSelectedCard(card);
    setSelectedColumnTitle(columnTitle);
    setIsTodoDetailsCardOpen(true);
  };

  const closeTodoDetailCardModal = useCallback(() => {
    setIsTodoDetailsCardOpen(false);
    setSelectedCard(null);
    setSelectedColumnTitle('');
  }, []);

  const fetchColumnsAndCards = useCallback(async () => {
    try {
      const columnsData = await getColumns({ dashboardId });

      const columnsWithCards = await Promise.all(
        columnsData.map(async (column) => {
          const cards = await getCards({ columnId: column.id });

          return { ...column, cards };
        }),
      );
      setColumns(columnsWithCards);
    } catch (err) {
      toast.error('데이터를 받아오는 중 오류 발생!');
    } finally {
      setLoading(false);
    }
  }, [dashboardId]);

  useEffect(() => {
    fetchColumnsAndCards();
  }, [isCreateCardModalOpen, isEditColumnModalOpen, onColumnUpdate]);

  const openCreateCardModal = (columnId: number) => {
    setActiveColumnId(columnId);
    setIsCreateCardModalOpen(true);
  };

  const closeCreateCardModal = () => {
    setActiveColumnId(0);
    setIsCreateCardModalOpen(false);
    fetchColumnsAndCards();
  };

  const handleEditColumnModal = useCallback(
    (columnId: number, open: boolean) => {
      setIsEditColumnModalOpen((prevState) => ({
        ...prevState,
        [columnId]: open,
      }));
    },
    [],
  );

  const handleColumnDelete = useCallback(() => {
    fetchColumnsAndCards(); // 컬럼 삭제 후 데이터 새로고침
  }, [fetchColumnsAndCards]);

  const handleCardDelete = useCallback(() => {
    fetchColumnsAndCards(); // 카드 삭제 후 데이터 새로고침
  }, [fetchColumnsAndCards]);

  // 드래그 시작 시 현재 드래그 중인 카드의 ID 저장
  const handleDragStart = useCallback((cardId: number) => {
    setDraggingCard(cardId);
  }, []);

  // 현재 마우스가 위치한 드롭 가능 영역(컬럼과 인덱스)을 상태에 저장
  const handleDragOver = useCallback(
    (e: React.DragEvent, columnId: number, index: number) => {
      e.preventDefault();
      setDropTarget({ columnId, index });
    },
    [],
  );

  // 드래그 종료시 드래그 관련 상태를 초기화
  const handleDragEnd = useCallback(() => {
    setDraggingCard(null);
    setDropTarget(null);
  }, []);

  // 드롭시 카드의 위치를 업데이트하고 서버에 변경사항을 전송
  const handleDrop = useCallback(
    async (e: React.DragEvent, targetColumnId: number, targetIndex: number) => {
      e.preventDefault();
      const cardId = Number(e.dataTransfer.getData('cardId'));
      const sourceColumnId = Number(e.dataTransfer.getData('sourceColumnId'));

      // 로컬 상태 업데이트: 카드 위치 변경
      setColumns((prevColumns) => {
        const newColumns = prevColumns.map((column) => ({
          ...column,
          cards: [...column.cards],
        }));
        const sourceColumn = newColumns.find(
          (col) => col.id === sourceColumnId,
        );
        const targetColumn = newColumns.find(
          (col) => col.id === targetColumnId,
        );

        if (!sourceColumn || !targetColumn) return prevColumns;

        const cardIndex = sourceColumn.cards.findIndex(
          (card) => card.id === cardId,
        );
        if (cardIndex === -1) return prevColumns;

        const [movedCard] = sourceColumn.cards.splice(cardIndex, 1);

        const updatedCard = { ...movedCard, columnId: targetColumnId };
        targetColumn.cards.splice(targetIndex, 0, updatedCard);

        return newColumns;
      });

      // 서버에 카드 이동 정보를 업데이트
      try {
        const currentCard = columns
          .flatMap((col) => col.cards)
          .find((card) => card.id === cardId);

        if (!currentCard) {
          toast.error('카드를 찾을 수 없습니다.');
          return;
        }

        const formValue: EditCardRequest = {
          columnId: targetColumnId,
          assigneeUserId: currentCard.assignee?.id,
          title: currentCard.title,
          description: currentCard.description,
          dueDate: currentCard.dueDate ? currentCard.dueDate : undefined,
          tags: currentCard.tags,
        };

        const result = await editCard({ cardId, formValue });

        socket?.emit('card', {
          member: userInfo?.nickname,
          action: 'edit',
          card: currentCard.title,
          room: String(dashboardId),
        });

        // 에러 처리 및 성공
        if ('message' in result) {
          toast.error('카드 이동 중 오류 발생');
        }
      } catch (err) {
        toast.error('카드 이동 중 예상치 못한 오류 발생');
      }

      handleDragEnd();
    },
    [columns, handleDragEnd],
  );

  if (loading) return <Spinner size={24} />;

  return (
    <div className="w-full lg:flex lg:h-full lg:max-w-1200 lg:overflow-hidden lg:overflow-x-scroll lg:whitespace-nowrap">
      {columns.map((column) => (
        <div
          key={column.id}
          className="w-full px-20 sm:border-b sm:p-12 md:border-r md:p-20 lg:flex lg:h-full lg:flex-col"
          onDragOver={(e) => handleDragOver(e, column.id, column.cards.length)}
          onDrop={(e) => handleDrop(e, column.id, column.cards.length)}
        >
          <div className="my-20 flex w-full items-center justify-between lg:min-w-300">
            <div className="flex items-center gap-4">
              <ColorCircle size="sm" color="bg-toss-blue" />
              <h1 className="max-w-120 overflow-hidden text-ellipsis whitespace-nowrap text-16 font-bold md:text-18">
                {column.title}
              </h1>
              <span className="inline-flex h-20 w-20 items-center justify-center rounded-4 bg-gray-200 text-12 text-gray-400">
                {column.cards.length}
              </span>
            </div>
            <div>
              <ColumnSettingButton
                isOpen={isEditColumnModalOpen[column.id]}
                handleOpen={(open) => handleEditColumnModal(column.id, open)}
                dashboardId={dashboardId}
                columnData={column}
                onColumnDelete={handleColumnDelete}
              />
            </div>
          </div>
          <BarButton onClick={() => openCreateCardModal(column.id)} />

          <div className="no-scrollbar sm:mb-12 md:mb-20 lg:flex-1 lg:overflow-y-auto">
            {column.cards.length === 0 ? (
              <div className="mt-20 flex h-200 w-full items-center justify-center sm:h-150">
                <div className="w-35 md:w-60">
                  <Image
                    src="/image/empty-comment-logo.png"
                    width={45}
                    height={45}
                    layout="responsive"
                    alt="댓글 비었을 때 로고"
                  />
                </div>
                <p className="pl-10 text-14 text-toss-blue-light md:text-16">
                  카드가 없습니다!
                </p>
              </div>
            ) : (
              column.cards.map((card, index) => (
                <div key={card.id}>
                  {dropTarget &&
                    dropTarget.columnId === column.id &&
                    dropTarget.index === index && (
                      <div className="h-2 bg-blue-500 transition-all duration-200" />
                    )}
                  <Card
                    card={card}
                    columnId={column.id}
                    columnTitle={column.title}
                    onDragStart={handleDragStart}
                    onDragOver={(e) => handleDragOver(e, column.id, index)}
                    onDrop={(e) => handleDrop(e, column.id, index)}
                    isDragging={draggingCard === card.id}
                    onClick={() => openTodoDetailCardModal(card, column.title)}
                  />
                </div>
              ))
            )}
            {dropTarget &&
              dropTarget.columnId === column.id &&
              dropTarget.index === column.cards.length && (
                <div className="h-2 bg-blue-300 transition-all duration-200" />
              )}
          </div>
        </div>
      ))}
      {selectedCard && (
        <TodoDetailModal
          todoModalIsOpen={isTodoDetailsCardOpen}
          todoModalOnClose={closeTodoDetailCardModal}
          cardId={selectedCard.id}
          columnTitle={selectedColumnTitle}
          onCardDelete={handleCardDelete}
        />
      )}
      <CreateCardModal
        isOpen={isCreateCardModalOpen}
        onClose={closeCreateCardModal}
        dashboardId={dashboardId}
        columnId={activeColumnId}
      />
    </div>
  );
}
