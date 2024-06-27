import { getCookie } from '@/utils/cookies';
import { CardImageResponse, ErrorMessage } from '@planit-api';

import { API_URL } from '../baseUrl';

type Params = {
  columnId: number;
  image: File;
};

export default async function postCardImage({
  columnId,
  image,
}: Params): Promise<CardImageResponse | ErrorMessage> {
  const token = getCookie('accessToken');

  const formData = new FormData();
  formData.append('image', image);

  const obj: RequestInit = {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await fetch(`${API_URL}/columns/${columnId}/card-image`, obj);
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
