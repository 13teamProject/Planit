import { getCookie } from '@/utils/cookies';
import { ErrorMessage, MemberListResponse } from '@planit-types';

import { API_URL } from './baseUrl';

type GetMembersParams = {
  dashboardId: number;
  page?: number;
  size?: 20;
};

export async function getMembers({
  dashboardId,
  page = 1,
  size = 20,
}: GetMembersParams): Promise<MemberListResponse | ErrorMessage> {
  const token = getCookie('accessToken');

  const query = new URLSearchParams({
    dashboardId: dashboardId.toString(),
    page: page.toString(),
    size: size.toString(),
  });

  const obj: RequestInit = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await fetch(`${API_URL}/members?${query}`, obj);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }

    return { message: '멤버 목록 조회 중 알 수 없는 오류가 발생했습니다.' };
  }
}
