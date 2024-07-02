import ProfileCircle from '@/components/commons/circle/ProfileCircle';
import Tag from '@/components/commons/tag';
import { GetCardResponse as CardType } from '@planit-types';
import Image from 'next/image';
import React from 'react';

type CardProps = {
  card: CardType;
  columnId: number;
  columnTitle: string;
  onDragStart: (cardId: number, columnId: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  isDragging: boolean;
};

const Card: React.FC<CardProps> = React.memo(
  ({
    card,
    columnId,
    columnTitle,
    onDragStart,
    onDragOver,
    onDrop,
    isDragging,
  }) => {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
      onDragStart(card.id, columnId);
      e.dataTransfer.setData('cardId', card.id.toString());
      e.dataTransfer.setData('sourceColumnId', columnId.toString());
    };

    // 날짜 포맷팅: YYYY-MM-DD HH:MM -> YYYY.MM.DD
    const formattedDueDate = card.dueDate.split(' ')[0].replace(/-/g, '.');

    return (
      <div
        draggable
        onDragStart={handleDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`mt-20 min-h-100 cursor-grab rounded-8 border bg-white p-10 transition-all duration-200 ${isDragging ? 'border-blue-500 opacity-50' : 'border-gray-200 hover:border-gray-400'} active:cursor-grabbing sm:block md:flex md:gap-20 md:p-20 lg:block`}
      >
        {card.imageUrl && (
          <div className="relative aspect-video bg-green-light-chip sm:w-full md:w-200 lg:w-full">
            <Image src={card.imageUrl} alt={card.title} layout="fill" />
          </div>
        )}
        <div className="flex flex-grow flex-col justify-between">
          <h1 className="py-4 sm:text-14 md:text-16">{card.title}</h1>
          <div className="md:flex md:w-full md:gap-16 lg:block">
            <div className="flex flex-wrap gap-6">
              {card.tags.map((tag) => (
                <Tag key={tag} color="green" size="sm">
                  {tag}
                </Tag>
              ))}
            </div>
            <div className="flex flex-grow items-baseline justify-between pt-8">
              <div className="flex items-baseline gap-4">
                <div className="relative h-14 w-14">
                  <Image
                    src="/icon/calendar_gray.svg"
                    alt="calendar"
                    layout="fill"
                    className="absolute"
                  />
                </div>
                <p className="flex-grow text-gray-300 sm:text-10 md:text-12">
                  {formattedDueDate}
                </p>
              </div>
              <ProfileCircle styles="size-24" data={card.assignee} />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

Card.displayName = 'Card';

export default Card;
