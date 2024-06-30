import { getCookie } from '@/utils/cookies';

import { API_URL } from './baseUrl';

export type DashboardIdResponse = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
};
type GetDashboardIdParams = {
  dashboardId: number;
};

// 대시보드 상세 조회 - GET
export async function getDashboardId({
  dashboardId,
}: GetDashboardIdParams): Promise<DashboardIdResponse> {
  try {
    const token = getCookie('accessToken');
    const response = await fetch(`${API_URL}/dashboards/${dashboardId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const body: DashboardIdResponse = await response.json();
    return body;
  } catch (err) {
    throw new Error('데이터를 받는 중에 오류가 발생했습니다.');
  }
}
