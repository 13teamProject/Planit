import LoginForm from '@/components/login/LoginForm';
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
  return (
    <>
      <header className="flex flex-col items-center gap-10 pb-50 md:gap-13 md:pb-38">
        <div className="w-120 md:w-150">
          <Image
            width={150}
            height={150}
            src="/image/logo_blue.png"
            alt="로고"
            layout="responsive"
          />
        </div>
        <p className="text-20">오늘도 만나서 반가워요!</p>
      </header>
      <LoginForm />
      <footer className="mt-26 text-center">
        회원이 아니신가요?{' '}
        <Link href="/signup">
          <span className="text-toss-blue underline underline-offset-4">
            회원가입하기
          </span>
        </Link>
      </footer>
    </>
  );
}
