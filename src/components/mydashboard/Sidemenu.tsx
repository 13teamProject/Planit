import Image from 'next/image';
import Link from 'next/link';

export default function Sidemenu() {
  return (
    <>
      <nav className="z-999 left-0 top-0 h-screen w-67 border-1 border-r-gray-200 bg-white pl-20 pt-20 md:w-160 md:pl-24 lg:w-300 lg:pl-24">
        <Link
          href="/"
          className="cursor-pointer text-25 font-bold text-toss-blue md:hidden lg:hidden"
        >
          :P
        </Link>
        <Link
          href="/"
          className="cursor-pointer text-25 font-bold text-toss-blue sm:hidden"
        >
          Planit:
        </Link>
        <div className="mt-50 flex items-center justify-between lg:pr-24">
          <p className="text-12 font-bold text-gray-400 sm:hidden">
            Dash Boards
          </p>
          <button className="md:pr-12">
            <Image
              src="/icon/add_box.svg"
              width={20}
              height={20}
              alt="대쉬보드 추가 버튼"
            />
          </button>
        </div>
      </nav>
    </>
  );
}
