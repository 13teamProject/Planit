import { getCookie } from '@/utils/cookies';

export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
  teamId: string;
  dashboardId: number;
};

// 대시보드 상세 조회 - GET
export async function getDashboardId({
  teamId,
  dashboardId,
}: GetDashboardIdParams): Promise<DashboardIdResponse> {
  try {
    const token = getCookie('accessToken');
    const response = await fetch(
      `${API_URL}/dashboards/${dashboardId}/?teamId=${teamId}&dashboardId=${dashboardId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const body: DashboardIdResponse = await response.json();
    return body;
  } catch (error) {
    throw error;
  }
}
