import { getCookie } from '@/utils/cookies';
import {
  DashboardEditResponse,
  DashboardInvitationResponse,
  DashboardListResponse,
  EmailRequest,
  ErrorMessage,
  Invitation,
} from '@planit-types';

export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

type DashboardResponse = {
  userId: number;
  createdByMe: boolean;
  updatedAt: string;
  createdAt: string;
  color: string;
  title: string;
  id: number;
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

type SuccessMessage = {
  success: true;
};

// 대시보드 목록 조회 - GET
export async function getDashboards(
  navigationMethod: string,
  page: number,
  size: number,
): Promise<DashboardListResponse> {
  try {
    const token = getCookie('accessToken');
    const response = await fetch(
      `${API_URL}/dashboards?navigationMethod=${navigationMethod}&page=${page}&size=${size}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const body: DashboardListResponse = await response.json();
    return body;
  } catch (error) {
    console.error('Failed to get dashboards : ', error);
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
      const errorBody = await response.json();
      console.error('Server error:', errorBody);
      throw new Error(`HTTP error: ${response.status}, ${errorBody.message}`);
    }

    const body: DashboardResponse = await response.json();
    return body;
  } catch (error) {
    console.error('Failed to post data:', error);
    throw error;
  }
}
// 대시보드 상세 조회 - GET
export async function getDashboradDetail(
  dashboardId: number,
): Promise<DashboardEditResponse | ErrorMessage> {
  const token = getCookie('accessToken');

  const obj: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await fetch(`${API_URL}/dashboards/${dashboardId}`, obj);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }
    return { message: '대시보드 정보 조회 중 알 수 없는 오류가 발생했습니다.' };
  }
}
// 대시보드 수정 - PUT
export async function updateDashboard(
  dashboardId: number,
  updateData: DashboardUpdateData,
): Promise<DashboardEditResponse | ErrorMessage> {
  const token = getCookie('accessToken');

  const obj: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  };
  try {
    const res = await fetch(`${API_URL}/dashboards/${dashboardId}`, obj);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }
    return { message: '대시보드 수정 중 알 수 없는 오류가 발생했습니다.' };
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

type GetMembersParams = {
  dashboardId: number;
  page?: number;
  size?: number;
};

// 대시보드 초대 불러오기
export async function getDashboardInvitation({
  dashboardId,
  page = 1,
  size = 5,
}: GetMembersParams): Promise<DashboardInvitationResponse | ErrorMessage> {
  const token = getCookie('accessToken');

  const query = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  const obj: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await fetch(
      `${API_URL}/dashboards/${dashboardId}/invitations?${query}`,
      obj,
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }
    return { message: '대시보드 정보 조회 중 알 수 없는 오류가 발생했습니다.' };
  }
}

// 대시보드 초대
export async function postInvitation(
  email: EmailRequest,
  dashboardId: number,
): Promise<Invitation | ErrorMessage> {
  const token = getCookie('accessToken');

  const obj: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(email),
  };
  try {
    const res = await fetch(
      `${API_URL}/dashboards/${dashboardId}/invitations`,
      obj,
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }
    return { message: '대시보드 초대 중 알 수 없는 오류가 발생했습니다.' };
  }
}

// 대시보드 초대 취소
export async function deleteInvitation(
  invitationId: number,
  dashboardId: number,
): Promise<SuccessMessage | ErrorMessage> {
  const token = getCookie('accessToken');

  const obj: RequestInit = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await fetch(
      `${API_URL}/dashboards/${dashboardId}/invitations/${invitationId}`,
      obj,
    );

    if (!res.ok) {
      const data = await res.json();
      throw new Error(`${data.message}`);
    }

    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }

    return { message: '구성원 삭제 중 알 수 없는 오류가 발생했습니다.' };
  }
}
