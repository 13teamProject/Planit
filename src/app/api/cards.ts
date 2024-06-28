import { getCookie } from '@/utils/cookies';
import {
  CardImageResponse,
  CreateCardRequest,
  CreateCardResponse,
  EditCardRequest,
  EditCardResponse,
  ErrorMessage,
  TodoDetailsCardResponse,
} from '@planit-types';

import { API_URL } from './baseUrl';
import { createRequestWithToken } from './createRequestWithToken';

// export async function getTodoCardDetails(
//   boardId: string,
// ): Promise<TodoDetailsCardResponse> {
//   const obj = createRequestWithToken('GET');

//   try {
//     const res = await fetch(`${API_URL}/cards/${boardId}`, obj);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message}`);

//     return data;
//   } catch (err) {
//     throw new Error('데이터를 받는 중에 오류가 발생했습니다.');
//   }
// }

type PostCardImageParams = {
  columnId: number;
  image: File;
};

export async function postCardImage({
  columnId,
  image,
}: PostCardImageParams): Promise<CardImageResponse | ErrorMessage> {
  const token = getCookie('accessToken');

  const formData = new FormData();
  formData.append('image', image);

  const obj: RequestInit = {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await fetch(`${API_URL}/columns/${columnId}/card-image`, obj);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }
    return { message: '이미지 업로드 중 알 수 없는 오류가 발생했습니다.' };
  }
}

export async function postCreateCard(
  formValue: CreateCardRequest,
): Promise<CreateCardResponse | ErrorMessage> {
  const token = getCookie('accessToken');

  const obj: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  obj.body = JSON.stringify({ ...formValue });

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

export async function editCard({
  cardId,
  formValue,
}: {
  cardId: number;
  formValue: EditCardRequest;
}): Promise<EditCardResponse | ErrorMessage> {
  const token = getCookie('accessToken');

  const obj: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  obj.body = JSON.stringify({ ...formValue });

  try {
    const res = await fetch(`${API_URL}/cards/${cardId}`, obj);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }

    return { message: '카드 수정 중 알 수 없는 오류가 발생했습니다.' };
  }
}
