import { TodoDetailsCardResponse } from '@planit-types';

import { API_URL } from './baseUrl';
import { createRequestWithToken } from './createRequestWithToken';

export async function getTodoCardDetails(
  boardId: string,
): Promise<TodoDetailsCardResponse> {
  const obj = createRequestWithToken('GET');

  try {
    const res = await fetch(`${API_URL}/cards/${boardId}`, obj);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    throw new Error('데이터를 받는 중에 오류가 발생했습니다.');
  }
}
