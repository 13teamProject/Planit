export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="m-auto my-107 w-351 md:my-189 md:w-520 lg:my-173 lg:w-520">
      {children}
    </div>
  );
}
