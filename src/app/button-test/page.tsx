import Button from '@/components/commons/button';
import AuthButton from '@/components/commons/button/AuthButton';
import BarButton from '@/components/commons/button/BarButton';
import React from 'react';

export default function page() {
  return (
    <div className="w-500 mx-auto my-40">
      <Button size="lg" text="취소" cancel={true} />
      <Button size="lg" text="거절" cancel={true} color="text-toss-blue" />
      <Button size="sm" text="생성" />
      <AuthButton text="로그인" />
      <AuthButton text="회원가입" disabled={true} />
      <BarButton />
      <BarButton text="새로운 컬럼 추가하기 " size="sm" />
    </div>
  );
}
