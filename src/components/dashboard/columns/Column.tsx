import { editCard } from '@/app/api/cards-goni';
import { getCards } from '@/app/api/getCards';
import { Column as ColumnType, getColumns } from '@/app/api/getColumns';
import BarButton from '@/components/commons/button/BarButton';
import ColorCircle from '@/components/commons/circle/ColorCircle';
import { EditCardRequest, GetCardResponse } from '@planit-types';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Card from '../cards/Card';

type ColumnProps = {
  dashboardId: number;
};

type ColumnWithCards = ColumnType & {
  cards: GetCardResponse[];
};

export default function Column({ dashboardId }: ColumnProps) {
  const [columns, setColumns] = useState<ColumnWithCards[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [draggingCard, setDraggingCard] = useState<number | null>(null);
  const [dropTarget, setDropTarget] = useState<{
    columnId: number;
    index: number;
  } | null>(null);

  useEffect(() => {
    async function fetchColumnsAndCards() {
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
        setError('데이터를 불러오는 중 에러가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }
    fetchColumnsAndCards();
  }, [dashboardId]);

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
          assigneeUserId: currentCard.assignee.id,
          title: currentCard.title,
          description: currentCard.description,
          dueDate: currentCard.dueDate,
          tags: currentCard.tags,
        };

        const result = await editCard({ cardId, formValue });

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

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full lg:flex lg:h-full lg:overflow-hidden">
      {columns.map((column) => (
        <div
          key={column.id}
          className="w-full px-20 sm:border-b sm:p-12 md:border-r md:p-20 lg:flex lg:h-full lg:flex-col"
          onDragOver={(e) => handleDragOver(e, column.id, column.cards.length)}
          onDrop={(e) => handleDrop(e, column.id, column.cards.length)}
        >
          <div className="my-20 flex w-full items-center justify-between">
            <div className="flex items-center justify-center gap-4">
              <ColorCircle size="sm" color="bg-toss-blue" />
              <h1 className="text-16 font-bold md:text-18">{column.title}</h1>
              <span className="inline-flex h-20 w-20 items-center justify-center rounded-4 bg-gray-200 text-12 text-gray-400">
                {column.cards.length}
              </span>
            </div>
            <Image
              src="/icon/settings.svg"
              alt="setting"
              width={22}
              height={22}
              className="cursor-pointer transition duration-500 ease-in-out hover:rotate-45"
            />
          </div>
          <BarButton />
          <div className="sm:mb-12 md:mb-20 lg:flex-1 lg:overflow-y-auto">
            {column.cards.map((card, index) => (
              <React.Fragment key={card.id}>
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
                />
              </React.Fragment>
            ))}
            {dropTarget &&
              dropTarget.columnId === column.id &&
              dropTarget.index === column.cards.length && (
                <div className="h-2 bg-blue-300 transition-all duration-200" />
              )}
          </div>
        </div>
      ))}
    </div>
  );
}
