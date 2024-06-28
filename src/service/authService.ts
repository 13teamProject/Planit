import { loginUser, signUpUser } from '@/app/api/auth';
import { useAuthStore } from '@/store/authStore';
import { deleteCookie, setCookie } from '@/utils/cookies';
import {
  BadRequest,
  LoginProps,
  SignUpProps,
  SignUpResult,
  UserInfoResponse,
} from '@planit-api';

// 회원가입
export async function handleSignUp({
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

// 로그인
export async function handleLogin({
  email,
  password,
}: LoginProps): Promise<UserInfoResponse | BadRequest> {
  const { login } = useAuthStore.getState();

  try {
    const { accessToken, user } = await loginUser({ email, password });

    setCookie('accessToken', accessToken, {
      path: '/',
      'max-age': 60 * 60 * 24,
      secure: true,
      samesite: 'strict',
    });

    login(user);

    return user;
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: '로그인 중 알 수 없는 오류가 발생했습니다.' };
  }
}

// 로그아웃
export async function handleLogout() {
  deleteCookie('accessToken');
  const { logout } = useAuthStore.getState();
  logout();
}

// 회원가입 후 자동로그인
export async function handleSignUpAndLogin({
  email,
  password,
  nickname,
}: SignUpProps): Promise<UserInfoResponse | BadRequest> {
  try {
    const signUpResult = await signUpUser({ email, password, nickname });

    if ('message' in signUpResult) {
      return signUpResult;
    }

    const loginResult = await handleLogin({ email, password });

    return loginResult;
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: '회원가입 중 알 수 없는 오류가 발생했습니다.' };
  }
}
