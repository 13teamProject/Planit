import { getCookie } from '@/utils/cookies';
import { GetCardResponse } from '@planit-types';

import { API_URL } from './baseUrl';

type GetCardColumnIdParams = {
  columnId: number;
};

type GetCardIdParams = {
  cardId: number;
};

// 카드 목록 조회
export async function getCards({
  columnId,
}: GetCardColumnIdParams): Promise<GetCardResponse[]> {
  try {
    const token = getCookie('accessToken');

    const searchParams = new URLSearchParams({
      columnId: columnId.toString(),
    });
    const url = `${API_URL}/cards?${searchParams.toString()}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const body = await response.json();

    return body.cards;
  } catch (err) {
    throw new Error('데이터를 받는 중에 오류가 발생했습니다.');
  }
}

// 카드 상세 조회
export async function getCardId({
  cardId,
}: GetCardIdParams): Promise<GetCardResponse> {
  try {
    const token = getCookie('accessToken');

    const url = `${API_URL}/cards/${cardId}`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const body = await response.json();

    return body;
  } catch (err) {
    throw new Error('데이터를 받는 중에 오류가 발생했습니다.');
  }
}
