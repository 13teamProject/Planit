import {
  LoginProps,
  LoginResponse,
  SignUpProps,
  SignUpResult,
} from '@planit-types';

import { API_URL, createFetchRequestOptions } from './baseUrl';

// 회원가입 데이터 전송
export async function signUpUser({
  email,
  password,
  nickname,
}: SignUpProps): Promise<SignUpResult> {
  const obj = createFetchRequestOptions('POST', {
    email,
    password,
    nickname,
  });

  try {
    const res = await fetch(`${API_URL}/users`, obj);
    const data = await res.json();

    if (!res.ok) {
      return { message: data.message || '회원가입에 실패하였습니다.' };
    }

    return data;
  } catch (error) {
    throw new Error('네트워크 오류가 발생했습니다. 연결을 확인하십시오.');
  }
}

// 로그인 데이터 전송
export async function loginUser({
  email,
  password,
}: LoginProps): Promise<LoginResponse> {
  const obj = createFetchRequestOptions('POST', {
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
