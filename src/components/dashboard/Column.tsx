import { getCards } from '@/app/api/cards';
import { getColumns } from '@/app/api/columns';
import BarButton from '@/components/commons/button/BarButton';
import ColorCircle from '@/components/commons/circle/ColorCircle';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { pusherClient } from '@/utils/pusher';
import { Column as ColumnType, GetCardResponse } from '@planit-types';
import Image from 'next/image';
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';
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

  const [selectedCard, setSelectedCard] = useState<GetCardResponse | null>(
    null,
  );
  const [selectedColumnTitle, setSelectedColumnTitle] = useState<string>('');
  const [isTodoDetailsCardOpen, setIsTodoDetailsCardOpen] = useState(false);
  const {
    draggingCard,
    dropTarget,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    indicatorsRef,
  } = useDragAndDrop({ columns, setColumns, dashboardId });

  const pusherListener = () => {
    pusherClient.bind('cards', (message: string) => {
      if (message.includes('삭제')) {
        toast.error(message, { containerId: 'pusher' });
      } else {
        toast.success(message, { containerId: 'pusher' });
      }

      fetchColumnsAndCards();
    });

    pusherClient.bind('columns', (message: string) => {
      if (message.includes('삭제')) {
        toast.error(message, { containerId: 'pusher' });
      } else {
        toast.success(message, { containerId: 'pusher' });
      }

      fetchColumnsAndCards();
    });
  };

  useEffect(() => {
    pusherListener();
  }, []);

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

  // 드래그 앤 드롭시 드롭하는 위치 표시하는 인디케이터
  const renderDropIndicator = useCallback(
    (columnId: number, index: number) => (
      <div
        key={`indicator-${columnId}-${index}`}
        ref={(el) => {
          if (el)
            (
              indicatorsRef as MutableRefObject<{
                [key: string]: HTMLElement | null;
              }>
            ).current[`${columnId}-${index}`] = el;
        }}
        data-column={columnId}
        data-index={index}
        className="mx-5 h-2 bg-blue-300 opacity-0 transition-all duration-200"
        style={{ height: 'var(--card-height, 2px)' }}
      />
    ),
    [indicatorsRef],
  );

  if (loading) return <Spinner size={24} />;

  return (
    <>
      {columns.map((column) => (
        <div
          key={column.id}
          className="w-full px-20 sm:border-b sm:p-12 md:border-r md:p-20 lg:inline-block lg:flex lg:h-full lg:min-w-300 lg:max-w-400 lg:flex-col"
          onDragOver={(e) => handleDragOver(e, column.id)}
          onDrop={(e) => handleDrop(e, column.id)}
          onDragLeave={handleDragEnd}
        >
          <div className="mb-20 flex w-full items-center justify-between">
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
            {renderDropIndicator(column.id, 0)}
            {column.cards.length === 0 ? (
              <div className="mt-20 flex h-200 w-full select-none items-center justify-center sm:h-150">
                <div className="w-35 md:w-60">
                  <Image
                    src="/image/empty-comment-logo.png"
                    width={45}
                    height={45}
                    layout="responsive "
                    alt="댓글 비었을 때 로고"
                  />
                </div>
                <p className="pointer-events-none pl-10 text-14 text-toss-blue-light md:text-16">
                  카드가 없습니다!
                </p>
              </div>
            ) : (
              column.cards.map((card, index) => (
                <div key={card.id}>
                  {dropTarget &&
                    dropTarget.columnId === column.id &&
                    dropTarget.index === index && (
                      <div className="mx-5 h-2 bg-blue-300 transition-all duration-200" />
                    )}
                  <Card
                    card={card}
                    columnId={column.id}
                    onDragStart={() => handleDragStart(card.id, column.id)}
                    isDragging={draggingCard === card.id}
                    onClick={() => openTodoDetailCardModal(card, column.title)}
                  />
                  {renderDropIndicator(column.id, index + 1)}
                </div>
              ))
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
          onColumnUpdate={onColumnUpdate}
        />
      )}
      <CreateCardModal
        isOpen={isCreateCardModalOpen}
        onClose={closeCreateCardModal}
        dashboardId={dashboardId}
        columnId={activeColumnId}
      />
    </>
  );
}
