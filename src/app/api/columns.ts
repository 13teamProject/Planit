import { getCookie } from '@/utils/cookies';
import { ColumnsListResponse, ErrorMessage } from '@planit-types';

import { API_URL } from './baseUrl';

export async function getColumns(
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
