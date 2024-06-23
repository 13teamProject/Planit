import SignUpForm from '@/components/signup/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="m-auto my-107 w-351 md:my-189 md:w-520 lg:my-173">
      <header className="pb-50 text-center md:pb-38">
        <p className="text-50 font-bold text-toss-blue">Planit:</p>
        <p className="text-20">첫 방문을 환영합니다!</p>
      </header>
      <SignUpForm />
      <footer className="mt-26 text-center">
        이미 가입하셨나요?{' '}
        <span className="text-toss-blue underline underline-offset-4">
          로그인하기
        </span>
      </footer>
    </div>
  );
}
