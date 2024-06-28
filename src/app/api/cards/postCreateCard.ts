import {
  CreateCardRequest,
  CreateCardResponse,
  ErrorMessage,
} from '@planit-api';

import { API_URL } from '../baseUrl';

export default async function postCreateCard(
  formValue: CreateCardRequest,
  token: string | undefined,
): Promise<CreateCardResponse | ErrorMessage> {
  const requestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const obj: RequestInit = {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(formValue),
  };

  try {
    const res = await fetch(`${API_URL}/cards`, obj);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }

    return { message: '카드 생성 중 알 수 없는 오류가 발생했습니다.' };
  }
}
