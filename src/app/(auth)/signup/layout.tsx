export const metadata = {
  title: '회원가입',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="m-auto my-107 w-full max-w-520 px-10 md:my-189 lg:my-173">
      {children}
    </div>
  );
}
