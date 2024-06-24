import SignUpForm from '@/components/signup/SignUpForm';
import Image from 'next/image';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <>
      <header className="flex flex-col items-center gap-10 pb-50 md:gap-13 md:pb-38">
        <div className="w-120 md:w-150">
          <Link href="/">
            <Image
              width={150}
              height={150}
              src="/image/logo_blue.png"
              alt="로고"
              layout="responsive"
            />
          </Link>
        </div>
        <p className="text-20">첫 방문을 환영합니다!</p>
      </header>
      <SignUpForm />
      <footer className="mt-26 text-center">
        이미 가입하셨나요?{' '}
        <Link href="/login">
          <span className="text-toss-blue underline underline-offset-4">
            로그인하기
          </span>
        </Link>
      </footer>
    </>
  );
}
