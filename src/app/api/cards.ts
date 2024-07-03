import { getCookie } from '@/utils/cookies';
import {
  ErrorMessage,
  SuccessMessage,
  TodoDetailsCardResponse,
} from '@planit-types';

import { API_URL } from './baseUrl';

// 할 일 카드 정보 가져오기
export async function getTodoCardDetails(
  cardId: number,
): Promise<TodoDetailsCardResponse | ErrorMessage> {
  const token = getCookie('accessToken');

  const obj: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await fetch(`${API_URL}/cards/${cardId}`, obj);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }

    return { message: '카드 데이터를 받는 중 알 수 없는 오류가 발생했습니다.' };
  }
}

// 할 일 카드 삭제
export async function deleteTodoCardDetails(
  cardId: number,
): Promise<SuccessMessage | ErrorMessage> {
  const token = getCookie('accessToken');

  const obj: RequestInit = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await fetch(`${API_URL}/cards/${cardId}`, obj);

    if (!res.ok) {
      const data = await res.json();
      return { message: data.message };
    }

    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }
    return { message: '카드 삭제 중 알 수 없는 오류가 발생했습니다.' };
  }
}
