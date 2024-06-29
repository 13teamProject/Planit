import { getCookie } from '@/utils/cookies';

export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
  teamId: string;
  dashboardId: number;
};

// 컬럼 목록 조회
export async function getColumns({
  teamId,
  dashboardId,
}: GetColumnsParams): Promise<Column[]> {
  try {
    const token = getCookie('accessToken');
    const response = await fetch(
      `${API_URL}/columns?teamId=${teamId}&dashboardId=${dashboardId}`,
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
