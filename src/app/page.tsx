import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="break-keep">
      <div className="mt-180 text-center text-toss-blue">
        <div className="mx-15">
          <div className="mb-40 text-26 font-light md:mb-35 md:flex md:grid-cols-2 md:items-center md:justify-center md:gap-18 md:text-62 lg:mb-35 lg:flex lg:grid-cols-2 lg:items-center lg:justify-center lg:gap-18 lg:text-76">
            <span className="-mb-7">새로운 일정 관리</span>
            <Image
              src="/image/main_banner_logo.png"
              alt="메인 배너 로고"
              width={272}
              height={65}
              className="m-auto mt-10 w-full max-w-140 md:m-0 md:max-w-240 lg:m-0 lg:max-w-272"
            />
          </div>
          <p className="mb-40 text-14 font-light md:mb-60 md:text-18 lg:mb-60 lg:text-18">
            시간 절약과 생산성 향상을 위해 설계된 스마트한 task 관리 솔루션을
            지금 바로 경험해보세요.
          </p>
          <Link
            href="/login"
            className="inline-block rounded-full border border-toss-blue px-30 py-10 text-12 md:px-70 md:py-25 md:text-18 lg:px-70 lg:py-25 lg:text-18"
          >
            로그인하기
          </Link>
        </div>
        <Image
          src="/image/main_banner.png"
          alt="메인 배너 이미지"
          width={1920}
          height={312}
          className="mt-60 md:mt-100 lg:mt-135"
        />
      </div>
      <div className="h-fit overflow-hidden bg-[#F9FAFB] py-60 lg:flex lg:items-center lg:overflow-auto lg:py-100">
        <div className="relative w-full">
          <div className="container before:-inset-1 before:bg-[url('/image/main_content01.png')] before:bg-contain before:bg-[center_right] before:bg-no-repeat lg:!py-150 lg:before:absolute">
            <span className="mb-10 inline-block rounded-b-lg bg-toss-blue px-13 py-7 text-14 font-bold text-white">
              Point 1
            </span>
            <h3 className="mb-10 text-36">우선순위 관리</h3>
            <p className="mb-25 pr-15 text-14 lg:text-18">
              중요한 일부터 체계적으로 관리하고, 업무 진행 상황을 한눈에
              확인하세요
              <br />
              또한 효율적으로 업무를 정리하고 진행할 수 있어요!
            </p>
          </div>
        </div>
        <Image
          src="/image/main_content01.png"
          alt="우선순위 관리 이미지"
          width={940}
          height={511}
          className="float-right pl-15 lg:hidden"
        />
      </div>
      <div className="bg-toss-blue-light lg:pt-190">
        <div className="container lg:flex lg:items-center lg:gap-30">
          <div className="lg:order-last lg:basis-1/2">
            <span className="mb-10 inline-block rounded-b-lg bg-toss-blue px-13 py-7 text-14 font-bold text-white">
              Point 2
            </span>
            <h3 className="mb-10 text-36">쉬운 할 일 관리</h3>
            <p className="mb-25 pr-15 text-14 lg:text-18">
              누구나 쉽게 할 일을 생성할 수 있습니다!
              <br />
              태그를 통해 중요한 업무와 우선순위가 높은 작업을{' '}
              <br className="hidden lg:block" />
              추적하여 놓치지 않도록 하세요
            </p>
          </div>
          <div className="lg:basis-1/2">
            <Image
              src="/image/main_content02.png"
              alt="쉬운 할 일 관리"
              width={435}
              height={510}
            />
          </div>
        </div>
      </div>
      <div className="bg-[#F9FAFB] py-60 lg:py-100">
        <div className="container">
          <h3 className="mb-35 text-26 md:text-28 lg:text-28">
            생산성을 높이는 다양한 설정 ⚡
          </h3>
          <div className="md:flex md:flex-wrap md:gap-10 lg:flex lg:gap-10">
            <div className="m-auto mb-20 w-full max-w-375 overflow-hidden rounded-lg md:mb-0 lg:mb-0">
              <div className="relative h-260 bg-white">
                <Image
                  src="/image/main_content03_1.png"
                  alt="대시보드 설정"
                  width={300}
                  height={124}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              <dl className="bg-toss-blue px-30 py-30 text-white">
                <dt className="text-24">대시보드 설정</dt>
                <dd className="text-16">
                  대시보드 컬러와 이름을 변경할 수 있어요.
                </dd>
              </dl>
            </div>
            <div className="m-auto mb-20 w-full max-w-375 overflow-hidden rounded-lg md:mb-0 lg:mb-0">
              <div className="relative h-260 bg-white">
                <Image
                  src="/image/main_content03_2.png"
                  alt="대시보드 설정"
                  width={300}
                  height={231}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              <dl className="bg-toss-blue px-30 py-30 text-white">
                <dt className="text-24">초대</dt>
                <dd className="text-16">새로운 팀원을 초대할 수 있어요.</dd>
              </dl>
            </div>
            <div className="m-auto w-full max-w-375 overflow-hidden rounded-lg">
              <div className="relative h-260 bg-white">
                <Image
                  src="/image/main_content03_3.png"
                  alt="대시보드 설정"
                  width={300}
                  height={196}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              <dl className="bg-toss-blue px-30 py-30 text-white">
                <dt className="text-24">구성원</dt>
                <dd className="text-16">구성원을 초대하고 내보낼 수 있어요.</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
