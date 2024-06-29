import { getCookie } from '@/utils/cookies';

export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type CardResponse = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    nickname: string;
    id: number;
    profileImageUrl: string;
  };
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
};

type GetCardParams = {
  teamId: string;
  columnId: number;
};

type GetCardIdParams = {
  teamId: string;
  cardId: number;
};

type CardsApiResponse = {
  cursorId: number;
  totalCount: number;
  cards: CardResponse[];
};

// 카드 목록 조회
export async function getCards({
  teamId,
  columnId,
}: GetCardParams): Promise<CardResponse[]> {
  try {
    const token = getCookie('accessToken');
    const response = await fetch(
      `${API_URL}/cards?teamId=${teamId}&columnId=${columnId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const body: CardsApiResponse = await response.json();

    return body.cards;
  } catch (err) {
    throw new Error('데이터를 받는 중에 오류가 발생했습니다.');
  }
}

// 카드 상세 조회
export async function getCardId({
  teamId,
  cardId,
}: GetCardIdParams): Promise<CardResponse> {
  try {
    const token = getCookie('accessToken');
    const response = await fetch(
      `${API_URL}/cards/${cardId}?teamId=${teamId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const body: CardResponse = await response.json();

    return body;
  } catch (err) {
    throw new Error('데이터를 받는 중에 오류가 발생했습니다.');
  }
}
