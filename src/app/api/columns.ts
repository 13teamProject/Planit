import { getCookie } from '@/utils/cookies';
import {
  Column,
  ColumnsListResponse,
  CreateColumnRequest,
  CreateColumnResponse,
  EditColumnRequest,
  EditColumnResponse,
  ErrorMessage,
} from '@planit-types';

import { API_URL } from './baseUrl';

// 컬럼 목록 조회
type GetColumnsParams = {
  dashboardId: number;
};

export type ColumnsResponse = {
  result: string;
  data: Column[];
};

export async function getColumns({
  dashboardId,
}: GetColumnsParams): Promise<Column[]> {
  try {
    const token = getCookie('accessToken');
    const response = await fetch(
      `${API_URL}/columns?dashboardId=${dashboardId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const body: ColumnsResponse = await response.json();
    if (body.result !== 'SUCCESS') {
      throw new Error(`API error: ${body.result}`);
    }

    return body.data;
  } catch (err) {
    throw new Error('데이터를 받는 중에 오류가 발생했습니다.');
  }
}

// FIXME: 중복
export async function getColumnList(
  dashboardId: number,
): Promise<ColumnsListResponse | ErrorMessage> {
  const token = getCookie('accessToken');

  const query = new URLSearchParams({
    dashboardId: dashboardId.toString(),
  });

  const obj: RequestInit = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await fetch(`${API_URL}/columns?${query}`, obj);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }

    return { message: '컬럼 목록 조회 중 알 수 없는 오류가 발생했습니다.' };
  }
}

export async function postCreateColumn(
  formValue: CreateColumnRequest,
): Promise<CreateColumnResponse | ErrorMessage> {
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
    const res = await fetch(`${API_URL}/columns`, obj);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }
    return { message: '컬럼 생성 중 알 수 없는 오류가 발생했습니다.' };
  }
}

export async function editColumn({
  columnId,
  formValue,
}: {
  columnId: number;
  formValue: EditColumnRequest;
}): Promise<EditColumnResponse | ErrorMessage> {
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
    const res = await fetch(`${API_URL}/columns/${columnId}`, obj);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }

    return { message: '컬럼 수정 중 알 수 없는 오류가 발생했습니다.' };
  }
}

type SuccessMessage = {
  success: true;
};

export async function deleteColumn(
  columnId: number,
): Promise<SuccessMessage | ErrorMessage> {
  const token = getCookie('accessToken');

  const obj: RequestInit = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await fetch(`${API_URL}/columns/${columnId}`, obj);

    if (!res.ok) {
      const data = await res.json();
      throw new Error(`${data.message}`);
    }

    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }

    return { message: '컬럼 삭제 중 알 수 없는 오류가 발생했습니다.' };
  }
}
