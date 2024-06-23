export default function DashBoardHeader() {
  return (
    <>
      <nav className="z-998 right-0 top-0 flex h-70 w-full items-center justify-between border-1 border-b-gray-200 bg-white py-25 pe-80 ps-40">
        <p className="text-20 font-bold">내 대시보드</p>
        <ul className="flex items-center">
          <li>
            <p className="flex h-38 w-38 items-center justify-center rounded-full border-2 border-white bg-orange-dashboard text-16 font-semibold text-white">{`K`}</p>
          </li>
          <li className="ps-12">
            <p className="text-16 font-medium">{`곽서연`}</p>
          </li>
        </ul>
      </nav>
    </>
  );
}
