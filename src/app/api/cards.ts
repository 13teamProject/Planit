import { getCookie } from '@/utils/cookies';
import {
  CardImageResponse,
  CreateCardRequest,
  CreateCardResponse,
  EditCardRequest,
  EditCardResponse,
  ErrorMessage,
  GetCardResponse,
  SuccessMessage,
  TodoDetailsCardResponse,
} from '@planit-types';

import { API_URL } from './baseUrl';

// 카드 생성
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

// 카드 목록 조회
type GetCardColumnIdParams = {
  columnId: number;
};

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

// 카드 수정
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

type GetCardIdParams = {
  cardId: number;
};

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

// FIXME: 중복
// 할 일 카드 정보 가져오기
export async function getTodoCardDetails(
  boardId: string,
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
    const res = await fetch(`${API_URL}/cards/${boardId}`, obj);
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

// 카드 이미지 업로드
export async function postCardImage({
  columnId,
  image,
}: {
  columnId: number;
  image: File;
}): Promise<CardImageResponse | ErrorMessage> {
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
