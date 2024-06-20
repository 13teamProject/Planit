import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://webfontworld.github.io/NexonLv2Gothic/NexonLv2Gothic.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
