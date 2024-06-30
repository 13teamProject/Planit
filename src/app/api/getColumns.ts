import { getCookie } from '@/utils/cookies';

import { API_URL } from './baseUrl';

export type Column = {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
};

export type ColumnsResponse = {
  result: string;
  data: Column[];
};

type GetColumnsParams = {
  dashboardId: number;
};

// 컬럼 목록 조회
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
