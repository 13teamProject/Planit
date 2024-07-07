import { loginUser, signUpUser } from '@/app/api/auth';
import { useAuthStore } from '@/store/authStore';
import { deleteCookie, setCookie } from '@/utils/cookies';
import {
  ErrorMessage,
  LoginProps,
  LoginResult,
  SignUpProps,
  UserInfoResponse,
} from '@planit-types';

// 로그인
export async function handleLogin({
  email,
  password,
}: LoginProps): Promise<LoginResult> {
  const { login } = useAuthStore.getState();

  const response = await loginUser({ email, password });

  if ('message' in response) {
    return response;
  }

  const { accessToken, user } = response;

  setCookie('accessToken', accessToken, {
    path: '/',
    'max-age': 60 * 60 * 24,
    secure: true,
    samesite: 'strict',
  });

  login(user);

  return response;
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
}: SignUpProps): Promise<UserInfoResponse | ErrorMessage> {
  const signUpResult = await signUpUser({ email, password, nickname });
  if ('message' in signUpResult) {
    return signUpResult;
  }

  const loginResult = await handleLogin({ email, password });
  if ('message' in loginResult) {
    return loginResult;
  }

  return loginResult.user;
}
