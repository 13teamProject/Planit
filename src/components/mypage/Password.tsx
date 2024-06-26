import { useForm } from 'react-hook-form';

import Button from '../commons/button';
import Input from '../commons/input';

export default function Password() {
  const { register } = useForm();
  return (
    <div>
      <h3 className="mb-32 text-24 font-bold">비밀번호 변경</h3>
      <form>
        <label htmlFor="password">현재 비밀번호</label>
        <Input
          id="password"
          type="password"
          placeholder="현재 비밀번호 입력"
          size="md"
          register={{ ...register('password', { required: true }) }}
        />

        <label htmlFor="password">새 비밀번호</label>
        <Input
          id="newPassword"
          type="password"
          placeholder="새 비밀번호 입력"
          size="md"
          register={{ ...register('newPassword', { required: true }) }}
        />

        <label htmlFor="password-confirm">새 비밀번호 확인</label>
        <Input
          id="password-confirm"
          type="password"
          placeholder="새 비밀번호 입력"
          size="md"
          register={{ ...register('password-confirm', { required: true }) }}
        />
        <Button type="submit" text="변경" />
      </form>
    </div>
  );
}
