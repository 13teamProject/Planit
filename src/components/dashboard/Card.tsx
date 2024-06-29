import { CardResponse as CardType, getCardId } from '@/app/api/cards/getCards';
import ProfileCircle from '@/components/commons/circle/ProfileCircle';
import Tag from '@/components/commons/tag';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type CardProps = {
  teamId: string;
  cardId: number;
  columnTitle: string;
};

export default function Card({ teamId, cardId, columnTitle }: CardProps) {
  const [card, setCard] = useState<CardType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const cardData = await getCardId({ teamId, cardId });
        setCard(cardData);
      } catch (err) {
        throw new Error('데이터를 받는 중에 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [teamId, cardId]);

  if (loading) return <div>로딩중...</div>;
  if (!card) return <div>카드가 없습니다.</div>;

  // 날짜 포맷팅: YYYY-MM-DD HH:MM -> YYYY.MM.DD
  const formattedDueDate = card.dueDate.split(' ')[0].replace(/-/g, '.');

  return (
    <div>
      <div
        key={card.id}
        className="mt-20 min-h-100 cursor-pointer rounded-8 border border-gray-200 bg-white p-10 hover:border-gray-400 sm:block md:flex md:gap-20 md:p-20 lg:block lg:min-w-200"
      >
        {card.imageUrl ? (
          <div className="relative aspect-video bg-green-light-chip sm:w-full md:w-200 lg:w-full">
            <Image src={card.imageUrl} alt={card.title} layout="fill" />
          </div>
        ) : null}
        <div className="flex flex-grow flex-col justify-between">
          <h1 className="py-4 sm:text-14 md:text-16">{card.title}</h1>
          <div className="md:flex md:w-full md:gap-16 lg:block">
            <div className="flex gap-6">
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
    </div>
  );
}