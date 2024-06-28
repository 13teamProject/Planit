import { IS_SERVER } from '@/constants/globalConstants';
import { getCookie } from '@/utils/cookies';
import { headers } from 'next/headers';

type BodyType = Record<string, unknown> | string;

export function createRequestWithToken(RESTMethod: string, body?: BodyType) {
  let token;
  if (IS_SERVER) {
    const headersList = headers();
    const cookieString = headersList.get('cookie') || '';
    token = getCookie('accessToken', cookieString);
  } else {
    token = getCookie('accessToken');
  }

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
