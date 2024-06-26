import { getCookie } from '@/utils/cookies';
import { headers } from 'next/headers';

const headersList = headers();
const cookieString = headersList.get('cookie') || '';
const token = getCookie('accessToken', cookieString);

type BodyType = Record<string, unknown> | string;

export function createRequestWithToken(RESTMethod: string, body: BodyType) {
  const requestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const obj: RequestInit = {
    method: RESTMethod,
    headers: requestHeaders,
  };

  obj.body = JSON.stringify(body);

  return obj;
}
