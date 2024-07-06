'use client';

import ProfileCircle from '@/components/commons/circle/ProfileCircle';
import Tag from '@/components/commons/tag';
import { GetCardResponse as CardType } from '@planit-types';
import Image from 'next/image';
import React from 'react';

type CardProps = {
  card: CardType;
  columnId: number;
  onDragStart: (cardId: number, columnId: number) => void;
  isDragging: boolean;
  onClick: () => void;
};

function Card({ card, columnId, onDragStart, onClick, isDragging }: CardProps) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDragStart(card.id, columnId);
    e.dataTransfer.setData('cardId', card.id.toString());
    e.dataTransfer.setData('sourceColumnId', columnId.toString());
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={onClick}
      role="presentation"
      className={`min-h-100 cursor-grab rounded-8 border bg-white p-10 transition-all duration-200 ${
        isDragging
          ? 'border-blue-300 opacity-50'
          : 'border-gray-200 hover:border-gray-400'
      } active:cursor-grabbing sm:block md:flex md:gap-20 md:p-20 lg:block`}
    >
      {card.imageUrl && (
        <div className="relative aspect-video sm:w-full md:w-200 lg:w-full">
          <Image
            src={card.imageUrl}
            alt={card.title}
            layout="fill"
            className="no-drag object-cover"
          />
        </div>
      )}
      <div className="flex flex-grow flex-col justify-between">
        <h1 className="overflow-hidden text-ellipsis whitespace-nowrap py-4 sm:max-w-150 sm:text-14 md:max-w-500 md:text-16 lg:max-w-300">
          {card.title}
        </h1>
        <div className="md:flex md:w-full md:gap-16 lg:block">
          <div className="flex flex-wrap gap-6">
            {card.tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
          <div className="flex flex-grow items-center justify-between pt-8">
            <div className="flex items-baseline gap-4">
              {card.dueDate && (
                <>
                  <div className="relative h-14 w-14">
                    <Image
                      src="/icon/calendar_gray.svg"
                      alt="calendar"
                      layout="fill"
                      className="absolute sm:mt-3 md:mt-2 lg:mt-2"
                    />
                  </div>
                  <p className="flex-grow text-gray-300 sm:text-10 md:text-12">
                    {card.dueDate.split(' ')[0].replace(/-/g, '.')}
                  </p>
                </>
              )}
            </div>
          </div>
          {card.assignee && (
            <ProfileCircle styles="size-24 text-12" data={card.assignee} />
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Card);
