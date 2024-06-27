import { getCookie } from '@/utils/cookies';

export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

type UserResponse = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
};

// 대시보드 목록 조회 - GET
export async function getUsers(): Promise<UserResponse> {
  try {
    const token = getCookie('accessToken');
    const response = await fetch(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const body: UserResponse = await response.json();
    console.log(body);
    return body;
  } catch (error) {
    console.error('Failed to get data : ', error);
    throw error;
  }
}
