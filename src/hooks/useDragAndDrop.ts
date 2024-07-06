import { editCard } from '@/app/api/cards';
import { useAuthStore } from '@/store/authStore';
import { useSocketStore } from '@/store/socketStore';
import {
  Column as ColumnType,
  EditCardRequest,
  GetCardResponse,
} from '@planit-types';
import { MutableRefObject, useCallback, useRef, useState } from 'react';
import { toast } from 'react-toastify';

type ColumnWithCards = ColumnType & {
  cards: GetCardResponse[];
};

type UseDragAndDropProps = {
  columns: ColumnWithCards[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnWithCards[]>>;
  dashboardId: number;
};

export const useDragAndDrop = ({
  columns,
  setColumns,
  dashboardId,
}: UseDragAndDropProps) => {
  const [draggingCard, setDraggingCard] = useState<number | null>(null); // 드래그 중인 카드의 ID
  const [dropTarget, setDropTarget] = useState<{
    columnId: number;
    index: number;
  } | null>(null); // 드롭할 위치
  const { socket } = useSocketStore();
  const { userInfo } = useAuthStore();
  const indicatorsRef: MutableRefObject<{ [key: string]: HTMLElement | null }> =
    useRef({}); // 드롭 인디케이터 참조 객체

  const handleDragStart = useCallback((cardId: number, columnId: number) => {
    setDraggingCard(cardId);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('sourceColumnId', columnId.toString()); // 현재 컬럼 ID를 로컬 스토리지에 저장
    }
  }, []);

  // 모든 드롭 인디케이터의 하이라이트 제거
  const clearAllHighlights = useCallback(() => {
    Object.values(indicatorsRef.current).forEach((indicator) => {
      if (indicator) {
        indicator.classList.remove('opacity-100');
        indicator.classList.add('opacity-0');
      }
    });
  }, []);

  // 특정 인디케이터 하이라이트
  const highlightIndicator = useCallback(
    (columnId: number, index: number) => {
      clearAllHighlights();
      const key = `${columnId}-${index}`;
      const indicator = indicatorsRef.current[key];
      if (indicator) {
        indicator.classList.remove('opacity-0');
        indicator.classList.add('opacity-100');
      }
    },
    [clearAllHighlights],
  );

  // 가장 가까운 드롭 인디케이터 찾기(카드의 위, 아래 찾음)
  const getClosestIndicator = useCallback(
    (
      columnId: number,
      y: number,
    ): { index: number; element: HTMLElement | null } => {
      const DISTANCE_OFFSET = 50;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      let closestElement: HTMLElement | null = null;

      Object.entries(indicatorsRef.current).forEach(([key, indicator]) => {
        if (indicator && key.startsWith(`${columnId}-`)) {
          const { top } = indicator.getBoundingClientRect();
          const distance = Math.abs(y - top - DISTANCE_OFFSET);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = parseInt(key.split('-')[1], 10);
            closestElement = indicator;
          }
        }
      });

      return { index: closestIndex, element: closestElement };
    },
    [],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent, columnId: number) => {
      e.preventDefault();
      const { index, element } = getClosestIndicator(columnId, e.clientY); // 마우스 위치에 가장 가까운 인디케이터 찾기
      if (element) {
        setDropTarget({ columnId, index });
        highlightIndicator(columnId, index);
      }
    },
    [getClosestIndicator, highlightIndicator],
  );

  // 드래그 종료시 카드,타켓,하이라이트 초기화
  const handleDragEnd = useCallback(() => {
    setDraggingCard(null);
    setDropTarget(null);
    clearAllHighlights();
  }, [clearAllHighlights]);

  const handleDrop = useCallback(
    async (e: React.DragEvent, targetColumnId: number) => {
      e.preventDefault();
      const cardId = Number(e.dataTransfer.getData('cardId'));
      const sourceColumnId = Number(e.dataTransfer.getData('sourceColumnId'));

      if (!dropTarget) return;

      const sourceColumn = columns.find((col) => col.id === sourceColumnId);
      const targetColumn = columns.find((col) => col.id === targetColumnId);

      if (!sourceColumn || !targetColumn) {
        toast.error('유효하지 않은 컬럼입니다.');
        return;
      }

      const cardToMove = sourceColumn.cards.find((card) => card.id === cardId);

      if (!cardToMove) {
        toast.error('카드를 찾을 수 없습니다.');
        return;
      }

      setColumns((prevColumns) => {
        const newColumns = prevColumns.map((column) => ({
          ...column,
          cards: [...column.cards],
        }));

        const sourceColumnIndex = newColumns.findIndex(
          (col) => col.id === sourceColumnId,
        );
        const targetColumnIndex = newColumns.findIndex(
          (col) => col.id === targetColumnId,
        );

        if (sourceColumnIndex === -1 || targetColumnIndex === -1)
          return prevColumns;

        const [movedCard] = newColumns[sourceColumnIndex].cards.splice(
          newColumns[sourceColumnIndex].cards.findIndex(
            (card) => card.id === cardId,
          ),
          1,
        );

        newColumns[targetColumnIndex].cards.splice(dropTarget.index, 0, {
          ...movedCard,
          columnId: targetColumnId,
        });

        return newColumns;
      });

      // 드롭시 서버에서 카드 위치 수정
      try {
        const formValue: EditCardRequest = {
          columnId: targetColumnId,
          assigneeUserId: cardToMove.assignee?.id,
          title: cardToMove.title,
          description: cardToMove.description,
          dueDate: cardToMove.dueDate ? cardToMove.dueDate : undefined,
          tags: cardToMove.tags,
        };

        const result = await editCard({ cardId, formValue });

        socket?.emit('card', {
          member: userInfo?.nickname,
          action: 'edit',
          card: cardToMove.title,
          room: String(dashboardId),
        });

        if ('message' in result) {
          toast.error('카드 이동 중 오류 발생');
        }
      } catch (err) {
        toast.error('카드 이동 중 예상치 못한 오류 발생');
      }

      handleDragEnd();
    },
    [columns, handleDragEnd, socket, userInfo, dashboardId, dropTarget],
  );

  return {
    draggingCard,
    dropTarget,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
    indicatorsRef,
  };
};
