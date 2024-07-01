import { getCookie } from '@/utils/cookies';
import { TodoDetailsCardResponse } from '@planit-types';

import { API_URL } from './baseUrl';

// 할 일 카드 정보 가져오기
export async function getTodoCardDetails(
  boardId: string,
): Promise<TodoDetailsCardResponse> {
  const token = getCookie('accessToken');

  try {
    const url = `${API_URL}/cards/${boardId}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    throw new Error('데이터를 받는 중에 오류가 발생했습니다.');
  }
}

// 할 일 카드 삭제
export async function deleteTodoCardDetails(
  cardId: number,
): Promise<string | null> {
  const token = getCookie('accessToken');

  try {
    const res = await fetch(`${API_URL}/comments/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 204) {
      alert('할 일 카드가 삭제되었습니다.');
      return null;
    }

    if (!res.ok) {
      const errorData = await res.json();
      return errorData.message || `HTTP error! status: ${res.status}`;
    }
    return null;
  } catch (err) {
    return '데이터를 삭제하는 중에 오류가 발생했습니다.';
  }
}
