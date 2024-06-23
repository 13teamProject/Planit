import { IS_DOCUMENT } from '@/constants/global-constants';
import { IncomingMessage } from 'http';

type CookieOptions = {
  path?: string;
  secure?: boolean;
  'max-age'?: number;
  samesite?: 'strict' | 'lax' | 'none';
};

export function getCookie(
  name: string,
  req?: IncomingMessage,
): string | undefined {
  if (IS_DOCUMENT) {
    if (!req?.headers?.cookie) {
      return undefined;
    }
    const matches = req.headers.cookie.match(
      new RegExp(
        `(?:^|; )${name.replace(/([.$*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`,
      ),
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([.$*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`,
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
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
