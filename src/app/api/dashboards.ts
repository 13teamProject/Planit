import { getCookie } from '@/utils/cookies';

export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

type DashboardResponse = {
  cursorId: number;
  totalCount: number;
  dashboards: Array<{
    id: number;
    title: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    createdByMe: boolean;
    userId: number;
  }>;
};

type DashboardUpdateData = {
  title: string;
  color: string;
};

type DashboardFormData = {
  title: string;
  color: string;
};

// 대시보드 목록 조회 - GET
export async function getDashboards(): Promise<DashboardResponse> {
  try {
    const token = getCookie('accessToken');
    const response = await fetch(
      `${API_URL}/dashboards?navigationMethod=infiniteScroll`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const body: DashboardResponse = await response.json();
    return body;
  } catch (error) {
    console.error('Failed to get data : ', error);
    throw error;
  }
}

// 대시보드 생성 - POST
export async function postDashboards(
  formData: DashboardFormData,
): Promise<DashboardResponse> {
  try {
    const token = getCookie('accessToken');
    const response = await fetch(`${API_URL}/dashboards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const body: DashboardResponse = await response.json();

    if (!body.dashboards) {
      throw new Error('No dashboards found in the response');
    }
    return body;
  } catch (error) {
    console.error('Failed to post data : ', error);
    throw error;
  }
}

// 대시보드 수정 - PUT
export async function updateDashboard(
  dashboardId: string,
  updateData: DashboardUpdateData,
): Promise<DashboardResponse> {
  try {
    const token = getCookie('accessToken');
    const response = await fetch(`${API_URL}/dashboards/${dashboardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const body: DashboardResponse = await response.json();
    console.log(body);
    return body;
  } catch (error) {
    console.error('Failed to update dashboard : ', error);
    throw error;
  }
}

// 대시보드 삭제 - DELETE
export async function deleteDashboard(dashboardId: string): Promise<void> {
  try {
    const token = getCookie('accessToken');
    const response = await fetch(`${API_URL}/dashboards/${dashboardId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    console.log(`Dashboard with ID ${dashboardId} deleted successfully.`);
  } catch (error) {
    console.error('Failed to delete dashboard : ', error);
    throw error;
  }
}
