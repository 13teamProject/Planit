import { getCookie } from '@/utils/cookies';
import { GetDashboardIdResponse } from '@planit-types';

import { API_URL } from './baseUrl';

type GetDashboardIdParams = {
  dashboardId: number;
};

// 대시보드 상세 조회 - GET
export async function getDashboardId({
  dashboardId,
}: GetDashboardIdParams): Promise<GetDashboardIdResponse> {
  try {
    const token = getCookie('accessToken');
    const response = await fetch(`${API_URL}/dashboards/${dashboardId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const body: GetDashboardIdResponse = await response.json();
    return body;
  } catch (err) {
    throw new Error('데이터를 받는 중에 오류가 발생했습니다.');
  }
}
