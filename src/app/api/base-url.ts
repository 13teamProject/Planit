export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

type BodyType = Record<string, unknown> | string;

export function createFetchRequestOptions(RestMethod: string, body?: BodyType) {
  const obj: RequestInit = {
    method: RestMethod,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    obj.body = JSON.stringify(body);
  }

  return obj;
}
