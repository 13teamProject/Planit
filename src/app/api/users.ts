import { getCookie } from '@/utils/cookies';
import {
  ErrorMessage,
  UpdateUser,
  UpdateUserPassword,
  UserInfoResponse,
} from '@planit-api';

import { API_URL } from './baseUrl';

type UserResponse = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
};

type ProfileImageResponse = {
  profileImageUrl: string;
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
    return body;
  } catch (error) {
    throw error;
  }
}

// 내 정보 조회
export async function getUserInfo(): Promise<UserInfoResponse | ErrorMessage> {
  const token = getCookie('accessToken');
  const obj: RequestInit = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await fetch(`${API_URL}/users/me`, obj);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }
    return { message: '이미지 업로드 중 알 수 없는 오류가 발생했습니다.' };
  }
}

// 이미지 업로드 API
export async function uploadProfileImage(
  image: File,
): Promise<ProfileImageResponse | ErrorMessage> {
  const token = getCookie('accessToken');

  const formData = new FormData();
  formData.append('image', image);
  const obj: RequestInit = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };

  try {
    const res = await fetch(`${API_URL}/users/me/image`, obj);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }
    return { message: '이미지 업로드 중 알 수 없는 오류가 발생했습니다.' };
  }
}

// 내 정보 수정
export async function editUserInfo(
  userData: UpdateUser,
): Promise<ErrorMessage> {
  const token = getCookie('accessToken');

  const obj: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  };

  try {
    const res = await fetch(`${API_URL}/users/me`, obj);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }
    return { message: '이미지 업로드 중 알 수 없는 오류가 발생했습니다.' };
  }
}

// 비밀번호 수정
export async function editUserPassword(
  Data: UpdateUserPassword,
): Promise<ErrorMessage> {
  const token = getCookie('accessToken');

  const obj: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(Data),
  };

  try {
    const res = await fetch(`${API_URL}/auth/password`, obj);
    if (res.status === 204) {
      return { message: '비밀번호 수정이 완료되었습니다.' };
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message}`);
    }

    return new Error();
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }
    return { message: '비밀번호 수정 중 알 수 없는 오류가 발생했습니다.' };
  }
}
