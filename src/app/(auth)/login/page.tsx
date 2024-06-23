import LoginForm from '@/components/login/LoginForm';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="m-auto my-107 w-351 md:my-189 md:w-520 lg:my-173 lg:w-520">
      <header className="pb-50 text-center md:pb-38">
        <p className="text-50 font-bold text-toss-blue">Planit:</p>
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
    </div>
  );
}
