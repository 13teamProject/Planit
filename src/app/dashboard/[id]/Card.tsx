import { CardResponse as CardType, getCardId } from '@/app/api/cards/getCards';
import ProfileCircle from '@/components/commons/circle/ProfileCircle';
import Tag from '@/components/commons/tag';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type CardProps = {
  teamId: string;
  cardId: number;
};

export default function Card({ teamId, cardId }: CardProps) {
  const [card, setCard] = useState<CardType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const cardData = await getCardId({ teamId, cardId });
        setCard(cardData);
      } catch (err) {
        setError('카드를 불러오는 중 오류가 발생!');
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [teamId, cardId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!card) return <div>No card data available</div>;

  // 날짜 포맷팅: YYYY-MM-DD HH:MM -> YYYY.MM.DD
  const formattedDueDate = card.dueDate.split(' ')[0].replace(/-/g, '.');

  return (
    <div>
      <div
        key={card.id}
        className="mt-20 cursor-pointer rounded-8 border border-gray-200 bg-white p-10 hover:border-gray-400 sm:block md:flex md:gap-20 md:p-20 lg:block lg:min-w-200"
      >
        <div className="relative h-100 rounded-8 bg-green-light-chip sm:w-full md:w-200 lg:w-full">
          <Image src={card.imageUrl} alt={card.title} layout="fill" />
        </div>
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
              <ProfileCircle size="sm" color="bg-green-200">
                {card.assignee.nickname.charAt(0)}
              </ProfileCircle>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
