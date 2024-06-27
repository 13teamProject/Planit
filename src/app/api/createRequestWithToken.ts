import { getCookie } from '@/utils/cookies';

type BodyType = Record<string, unknown> | string;

export function createRequestWithToken(RESTMethod: string, body: BodyType) {
  const token = getCookie('accessToken');

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
