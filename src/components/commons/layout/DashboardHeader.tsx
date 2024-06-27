'use-client';

import { getDashboards } from '@/app/api/dashboards';
import { getUsers } from '@/app/api/users';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import ProfileCircle from '../circle/ProfileCircle';

const PROFILES = ['Y', 'C', 'K', 'J', 'P', 'L']; // 임시 데이터

type Dashboard = {
  id: number;
  title: string;
};

type User = {
  id: number;
  nickname: string;
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
      const response = await getDashboards();
      const fetchedDashboards = response.dashboards.map((data: Dashboard) => ({
        id: data.id,
        title: data.title,
      }));
      setDashboards(fetchedDashboards);

      // URL의 id와 일치하는 대시보드의 타이틀
      const currentDashboard = fetchedDashboards.find(
        (dashboard) => String(dashboard.id) === dashboardid,
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
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    }

    fetchUser();
  }, []);

  const toggleProfiles = () => {
    // Profile Circle toggle
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
              <li key={profile}>
                <ProfileCircle color="bg-orange-400" size="md">
                  {profile}
                </ProfileCircle>
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
              >
                <ProfileCircle color="bg-pink-400" size="md">
                  +{extraCount}
                </ProfileCircle>
              </button>
            )}
          </div>
        )}
        {isDashboard && (
          <div className="mx-12 h-38 border-l border-gray-200 md:mx-24 lg:mx-32" />
        )}
        <li className="h-38 font-semibold">
          <ProfileCircle color="bg-violet-dashboard" size="md">
            K
          </ProfileCircle>
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
