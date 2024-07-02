import ToastProvider from '@/components/commons/toast';
import { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

const customFont = localFont({
  src: [
    {
      path: '../../public/fonts/NEXON_Lv2_Gothic_Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NEXON_Lv2_Gothic.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NEXON_Lv2_Gothic_Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NEXON_Lv2_Gothic_Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--nexonGothicFont',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | 플랜잇',
    default: '플랜잇 | 나만의 일정관리 매니저',
  },
  description: '나만의 일정관리 매니저',
  icons: {
    icon: '/icon/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body suppressHydrationWarning className={`${customFont.variable}`}>
        <ToastProvider>
          {children}
          <div id="modal-root" />
        </ToastProvider>
      </body>
    </html>
  );
}
