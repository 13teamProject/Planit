'use-client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import ProfileCircle from '../commons/circle/ProfileCircle';

const PROFILES = ['Y', 'C', 'K', 'J', 'P', 'L']; // 임시 데이터

export default function DashBoardHeader({
  isDashboard,
}: {
  isDashboard: boolean;
}) {
  const [maxVisible, setMaxVisible] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 744) {
        // 모바일 (sm)
        setMaxVisible(2);
      } else if (window.innerWidth < 1200) {
        // 태블릿 (md)
        setMaxVisible(2);
      } else {
        // PC (lg 이상)
        setMaxVisible(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const visibleProfiles = PROFILES.slice(0, maxVisible);
  const extraCount = PROFILES.length - maxVisible;
  return (
    <>
      <nav className="z-998 right-0 top-0 flex h-70 w-full items-center justify-end border-1 border-l-0 border-b-gray-200 bg-white py-25 pr-12 md:pr-40 lg:justify-between lg:pe-80 lg:ps-40">
        <p className="text-20 font-bold sm:hidden lg:block">내 대시보드</p>
        <ul className="flex items-center">
          {isDashboard && (
            <li className="pl-12">
              <Link href={`/dashboard/boardId/edit`}>
                <button className="flex h-40 w-88 items-center justify-center rounded-8 border-1 border-gray-200 text-16 font-medium text-gray-400 hover:border-black-700">
                  <Image
                    src="/icon/settings.svg"
                    className="mr-8 sm:hidden md:block lg:block"
                    width={20}
                    height={20}
                    alt="관리 아이콘"
                  />
                  관리
                </button>
              </Link>
            </li>
          )}
          {isDashboard && (
            <li>
              <button className="ml-16 mr-16 flex h-40 w-116 items-center justify-center rounded-8 border-1 border-gray-200 text-16 font-medium text-gray-400 hover:border-black-700 md:mr-32 lg:mr-40">
                <Image
                  src="/icon/add_box.svg"
                  className="mr-8 sm:hidden md:block lg:block"
                  width={20}
                  height={20}
                  alt="초대하기 아이콘"
                />
                초대하기
              </button>
            </li>
          )}
          {isDashboard && (
            <div className="flex font-semibold">
              {visibleProfiles.map((profile, index) => (
                <li key={index}>
                  <ProfileCircle color="bg-orange-400" size="md">
                    {profile}
                  </ProfileCircle>
                </li>
              ))}
              {extraCount > 0 && (
                <li>
                  <ProfileCircle color="bg-pink-400" size="md">
                    +{extraCount}
                  </ProfileCircle>
                </li>
              )}
            </div>
          )}
          {isDashboard && (
            <div className="mx-12 h-38 border-l border-gray-200 md:mx-24 lg:mx-32"></div>
          )}
          <li className="h-38 font-semibold">
            <ProfileCircle color="bg-violet-dashboard" size="md">
              K
            </ProfileCircle>
          </li>
          <li className="pl-12">
            <p className="text-16 font-medium sm:hidden md:block lg:block">{`곽서연`}</p>
          </li>
        </ul>
      </nav>
    </>
  );
}
