import Button from '@/components/commons/button';
import AuthButton from '@/components/commons/button/AuthButton';
import BarButton from '@/components/commons/button/BarButton';
import React from 'react';

export default function page() {
  return (
    <div className="w-500 mx-auto my-40">
      <BarButton text="새로운 컬럼 추가하기" />
      <BarButton />
      <BarButton text="새로운 컬럼 추가하기" size="sm" />
      <BarButton size="sm" />
    </div>
  );
}
