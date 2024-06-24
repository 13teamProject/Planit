import Image from 'next/image';
import Link from 'next/link';

export default function Sidemenu() {
  return (
    <>
      <nav className="z-999 left-0 top-0 h-screen w-300 border-1 border-r-gray-200 bg-white pl-24 pt-20">
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
        <div className="mt-50 flex justify-between pr-24">
          <p className="text-12 font-bold text-gray-400 sm:hidden">
            Dash Boards
          </p>
          <button>
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
