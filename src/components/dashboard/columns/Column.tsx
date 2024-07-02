import { getCards } from '@/app/api/getCards';
import { Column as ColumnType, getColumns } from '@/app/api/getColumns';
import BarButton from '@/components/commons/button/BarButton';
import ColorCircle from '@/components/commons/circle/ColorCircle';
import { GetCardResponse } from '@planit-types';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';

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

  const handleDragStart = useCallback(
    (cardId: number, sourceColumnId: number) => {
      setDraggingCard(cardId);
    },
    [],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent, columnId: number, index: number) => {
      e.preventDefault();
      setDropTarget({ columnId, index });
    },
    [],
  );

  const handleDragEnd = useCallback(() => {
    setDraggingCard(null);
    setDropTarget(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, targetColumnId: number, targetIndex: number) => {
      e.preventDefault();
      const cardId = Number(e.dataTransfer.getData('cardId'));
      const sourceColumnId = Number(e.dataTransfer.getData('sourceColumnId'));

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

        const [movedCard] = sourceColumn.cards.splice(
          sourceColumn.cards.findIndex((card) => card.id === cardId),
          1,
        );

        if (!movedCard) return prevColumns;

        targetColumn.cards.splice(targetIndex, 0, {
          ...movedCard,
          columnId: targetColumnId,
        });

        return newColumns;
      });

      handleDragEnd();
      // TODO: 서버에 카드 이동 정보를 업데이트하는 API 호출
    },
    [handleDragEnd],
  );

  if (loading) return <div>Loading...</div>;
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
                <div className="h-2 bg-blue-500 transition-all duration-200" />
              )}
          </div>
        </div>
      ))}
    </div>
  );
}
