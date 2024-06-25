import { ErrorResponse, UpdateUser, UserInfoResponse } from '../../../types';

// 임시로 토큰 가져오기
export async function getAccessToken() {
  const res = await fetch(
    `https://sp-taskify-api.vercel.app/6-13/auth/login
`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'zzoni@test.com', password: 'qwer1234' }),
    },
  );
  const data = await res.json();
  return data.accessToken;
}

// 내 정보 조회
export async function getUserInfo(): Promise<UserInfoResponse> {
  try {
    const token = await getAccessToken();
    const res = await fetch(`https://sp-taskify-api.vercel.app/6-13/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    return json;
  } catch (e) {
    throw new Error('오류가 났습니다. 근데요.');
  }
}

// 이미지 업로드 API
export async function uploadProfileImage(image: File): Promise<string> {
  const token = await getAccessToken();
  const formData = new FormData();
  formData.append('image', image);
  const res = await fetch(
    `https://sp-taskify-api.vercel.app/6-13/users/me/image`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );
  const json = await res.json();
  return json.profileImageUrl;
}

// 내 정보 수정
export async function editUserInfo(data: UpdateUser): Promise<ErrorResponse> {
  try {
    const token = await getAccessToken();
    const res = await fetch(`https://sp-taskify-api.vercel.app/6-13/users/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.status !== 200) {
      return {
        success: false,
        message: json.message,
      };
    }
    return {
      success: true,
      message: '수정이 완료되었습니다.',
      data: json,
    };
  } catch (e) {
    throw new Error('오류가 났습니다. 근데요.');
  }
}
