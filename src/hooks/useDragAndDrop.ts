import { editCard } from '@/app/api/cards';
import { useAuthStore } from '@/store/authStore';
import { useSocketStore } from '@/store/socketStore';
import {
  Column as ColumnType,
  EditCardRequest,
  GetCardResponse,
} from '@planit-types';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

type UseDragAndDropProps = {
  columns: ColumnWithCards[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnWithCards[]>>;
  dashboardId: number;
};

type ColumnWithCards = ColumnType & {
  cards: GetCardResponse[];
};

export const useDragAndDrop = ({
  columns,
  setColumns,
  dashboardId,
}: UseDragAndDropProps) => {
  const [draggingCard, setDraggingCard] = useState<number | null>(null);
  const [dropTarget, setDropTarget] = useState<{
    columnId: number;
    index: number;
  } | null>(null);
  const { socket } = useSocketStore();
  const { userInfo } = useAuthStore();

  const handleDragStart = useCallback((cardId: number) => {
    setDraggingCard(cardId);
  }, []);

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
    async (e: React.DragEvent, targetColumnId: number, targetIndex: number) => {
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

        const cardIndex = sourceColumn.cards.findIndex(
          (card) => card.id === cardId,
        );
        if (cardIndex === -1) return prevColumns;

        const [movedCard] = sourceColumn.cards.splice(cardIndex, 1);
        const updatedCard = { ...movedCard, columnId: targetColumnId };
        targetColumn.cards.splice(targetIndex, 0, updatedCard);

        return newColumns;
      });

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

        if ('message' in result) {
          toast.error('카드 이동 중 오류 발생');
        }
      } catch (err) {
        toast.error('카드 이동 중 예상치 못한 오류 발생');
      }

      handleDragEnd();
    },
    [columns, handleDragEnd, socket, userInfo, dashboardId],
  );

  return {
    draggingCard,
    dropTarget,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
  };
};
