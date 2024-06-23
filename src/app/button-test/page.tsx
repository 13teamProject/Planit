import Button from '@/components/commons/button';
import AuthButton from '@/components/commons/button/AuthButton';
import React from 'react';

export default function page() {
  return (
    <div className="w-500 mx-auto my-40">
      <AuthButton text="로그인" disabled={true} />
      <AuthButton text="가입하기" />
    </div>
  );
}
