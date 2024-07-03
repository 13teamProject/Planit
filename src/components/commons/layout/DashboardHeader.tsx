'use client';

import { getDashboards } from '@/app/api/dashboards';
import { getUsers } from '@/app/api/users';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import ProfileCircle from '../circle/ProfileCircle';

const PROFILES = [
  {
    nickname: 'Y',
    profileImageUrl: null,
  },
  {
    nickname: 'C',
    profileImageUrl: null,
  },
  {
    nickname: 'K',
    profileImageUrl: null,
  },
  {
    nickname: 'J',
    profileImageUrl: null,
  },
  {
    nickname: 'P',
    profileImageUrl: null,
  },
  {
    nickname: 'L',
    profileImageUrl: null,
  },
];

type Dashboard = {
  id: number;
  title: string;
};

type User = {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
};

export default function DashBoardHeader({
  isDashboard,
}: {
  isDashboard: boolean;
}) {
  const [maxVisible, setMaxVisible] = useState(4);
  const [isExpanded, setIsExpanded] = useState(false);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [currentTitle, setCurrentTitle] = useState('Title');
  const [dashboardId, setDashboardId] = useState<string>('9800'); // 9800 (임시 데이터)
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleResize = () => {
      let newSize = 4;
      if (window.innerWidth < 744) {
        newSize = 2; // 모바일 (sm)
      } else if (window.innerWidth < 1200) {
        newSize = 2; // 태블릿 (md)
      } else {
        newSize = isExpanded ? PROFILES.length : 4; // PC (lg 이상)
      }
      setMaxVisible(newSize);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isExpanded]);

  useEffect(() => {
    async function fetchDashboard() {
      const dashboardid = searchParams.get('dashboardid') || '9800'; // 9800 (임시 데이터)
      setDashboardId(dashboardid);

      // 대시보드 id, title 데이터
      const response = await getDashboards('infiniteScroll', 1, 9); // 데이터 size 수정 필요
      const fetchedDashboards = response.dashboards.map((data: Dashboard) => ({
        id: data.id,
        title: data.title,
      }));
      setDashboards(fetchedDashboards);

      // URL의 id와 일치하는 대시보드의 타이틀
      const currentDashboard = fetchedDashboards.find(
        (dashboard: Dashboard) => String(dashboard.id) === dashboardid,
      );
      if (currentDashboard) {
        setCurrentTitle(currentDashboard.title);
      }
    }

    fetchDashboard();
  }, [searchParams]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUsers();
        console.log(`User ID: ${userData.id}`);
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    }

    fetchUser();
  }, []);

  // Profile Circle toggle
  const toggleProfiles = () => {
    if (window.innerWidth >= 1200) {
      setIsExpanded(!isExpanded);
      setMaxVisible(!isExpanded ? PROFILES.length : 4);
    }
  };

  const visibleProfiles = PROFILES.slice(0, maxVisible);
  const extraCount = PROFILES.length - maxVisible;

  return (
    <nav className="right-0 top-0 z-[998] flex h-70 w-full items-center justify-end border-1 border-l-0 border-b-gray-200 bg-white py-25 pr-12 md:pr-40 lg:justify-between lg:pe-80 lg:ps-40">
      {!isDashboard && (
        <p className="text-20 font-bold sm:hidden lg:block">내 대시보드</p>
      )}
      {isDashboard && (
        <p className="text-20 font-bold sm:hidden lg:block">{currentTitle}</p>
      )}
      <ul className="flex items-center">
        {isDashboard && (
          <li className="pl-12">
            <Link href={`/dashboard/${dashboardId}/edit`}>
              <button
                type="button"
                className="flex h-40 w-88 items-center justify-center rounded-8 border-1 border-gray-200 text-16 font-medium text-gray-400 hover:border-black-700"
              >
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
            <button
              type="button"
              className="ml-16 mr-16 flex h-40 w-116 items-center justify-center rounded-8 border-1 border-gray-200 text-16 font-medium text-gray-400 hover:border-black-700 md:mr-32 lg:mr-40"
            >
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
            {visibleProfiles.map((profile) => (
              <li key={profile.nickname}>
                <ProfileCircle
                  data={profile}
                  styles="size-34 md:size-38 bg-orange-400"
                />
              </li>
            ))}
            {extraCount > 0 && (
              <button
                type="button"
                onClick={toggleProfiles}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    toggleProfiles();
                  }
                }}
                className="focus:outline-none"
                aria-label="프로필 추가 버튼"
              >
                <div className="flex size-34 transform cursor-pointer items-center justify-center rounded-full bg-pink-400 text-white ring-2 ring-white transition-transform duration-200 ease-in-out hover:scale-110 md:size-38">
                  +{extraCount}
                </div>
              </button>
            )}
          </div>
        )}
        {isDashboard && (
          <div className="mx-12 h-38 border-l border-gray-200 md:mx-24 lg:mx-32" />
        )}
        <li className="font-semibold">
          <ProfileCircle
            data={PROFILES[2]}
            styles="size-34 md:size-38 bg-violet-dashboard"
          />
        </li>
        <li className="pl-12">
          {user && (
            <p className="text-16 font-medium sm:hidden md:block lg:block">
              {user.nickname}
            </p>
          )}
        </li>
      </ul>
    </nav>
  );
}
