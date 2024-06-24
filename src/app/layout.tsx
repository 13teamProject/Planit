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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning className={`${customFont.variable}`}>
        {children}
        <div id="modal-root" />
      </body>
    </html>
  );
}
