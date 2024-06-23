import { BadRequest, SignUpProps, SignUpResponse } from '../../../types';
import { API_URL, createFetchRequestOptions } from './base-url';

// 회원가입
type SignUpResult = SignUpResponse | BadRequest;

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

export async function handleSignUpUser({
  email,
  password,
  nickname,
}: SignUpProps): Promise<SignUpResult> {
  try {
    return await signUpUser({ email, password, nickname });
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: '회원가입 중 알 수 없는 오류가 발생했습니다.' };
  }
}
