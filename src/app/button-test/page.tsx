import Button from '@/components/commons/button';
import React from 'react';

export default function page() {
  return (
    <>
      <Button size="lg" text="생성" />
      <Button size="sm" text="취소" cancled={true} />
    </>
  );
}
