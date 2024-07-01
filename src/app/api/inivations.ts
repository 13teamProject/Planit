import { getCookie } from '@/utils/cookies';
import {
  DashboardInvitationResponse,
  EmailRequest,
  Invitation,
  MyInivationErrorMessage,
  MyInvitationResponse,
  MyInvitationsResponse,
} from '@planit-types';

export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

// 내가 받은 초대 목록 조회 - GET
export async function getMyInivations(
  size: number,
): Promise<MyInvitationsResponse | MyInivationErrorMessage> {
  const token = getCookie('accessToken');

  const obj: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await fetch(`${API_URL}/invitations?size=${size}`, obj);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }
    return {
      message: '내가 받은 초대 목록 조회 중 알 수 없는 오류가 발생했습니다.',
    };
  }
}

// 초대 응답 - PUT
export async function respondToInvitation(
  invitationId: number,
  inviteAccepted: boolean,
): Promise<MyInvitationResponse | MyInivationErrorMessage> {
  const token = getCookie('accessToken');

  const obj: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ inviteAccepted }),
  };

  try {
    const res = await fetch(`${API_URL}/invitations/${invitationId}`, obj);
    const data: MyInvitationResponse = await res.json();

    if (!res.ok)
      throw new Error(data.message || 'Failed to respond to invitation.');

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }
    return {
      message: '초대 응답 중 알 수 없는 오류가 발생했습니다.',
    };
  }
}

// 대시보드 초대 불러오기 - GET

type GetMembersParams = {
  dashboardId: number;
  page?: number;
  size?: number;
};

export async function getDashboradInvitation({
  dashboardId,
  page = 1,
  size = 5,
}: GetMembersParams): Promise<
  DashboardInvitationResponse | MyInivationErrorMessage
> {
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

// 대시보드 초대 - POST
export async function postInvitation(
  email: EmailRequest,
  dashboardId: number,
): Promise<Invitation | MyInivationErrorMessage> {
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
