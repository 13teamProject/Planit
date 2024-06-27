export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

type BodyType = Record<string, unknown> | string;

export function createFetchRequestOptions(RESTMethod: string, body?: BodyType) {
  const obj: RequestInit = {
    method: RESTMethod,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    obj.body = JSON.stringify(body);
  }

  return obj;
}