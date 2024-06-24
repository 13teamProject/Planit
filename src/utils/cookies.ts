import { IS_SERVER } from '@/constants/global-constants';

type CookieOptions = {
  path?: string;
  secure?: boolean;
  'max-age'?: number;
  samesite?: 'strict' | 'lax' | 'none';
};

export function getCookie(
  name: string,
  cookieString?: string,
): string | undefined {
  const cookiePattern = new RegExp(
    `(?:^|; )${name.replace(/([.$*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`,
  );

  if (cookieString) {
    const matches = cookieString.match(cookiePattern);
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  if (IS_SERVER) {
    const matches = document.cookie.match(cookiePattern);
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  return undefined;
}

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {},
): void {
  const updatedOptions: CookieOptions = {
    path: '/',
    ...options,
  };

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  Object.entries(updatedOptions).forEach(([key, optionValue]) => {
    updatedCookie += `; ${key}`;
    if (optionValue !== true) {
      updatedCookie += `=${optionValue}`;
    }
  });

  document.cookie = updatedCookie;
}

export function deleteCookie(name: string): void {
  setCookie(name, '', {
    'max-age': -1,
  });
}
