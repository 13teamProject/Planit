import {
  LoginProps,
  LoginResponse,
  SignUpProps,
  SignUpResult,
} from '@planit-types';

import { API_URL } from './baseUrl';

// 회원가입 데이터 전송
export async function signUpUser({
  email,
  password,
  nickname,
}: SignUpProps): Promise<SignUpResult> {
  const obj: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  obj.body = JSON.stringify({
    email,
    password,
    nickname,
  });

  try {
    const res = await fetch(`${API_URL}/users`, obj);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: '회원가입 중 알 수 없는 오류가 발생했습니다.' };
  }
}

// 로그인 데이터 전송
export async function loginUser({
  email,
  password,
}: LoginProps): Promise<LoginResponse> {
  const obj: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  obj.body = JSON.stringify({
    email,
    password,
  });

  const res = await fetch(`${API_URL}/auth/login`, obj);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || '로그인에 실패하였습니다.');
  }

  return data;
}
