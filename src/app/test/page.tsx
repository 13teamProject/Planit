'use client';

import TextInput from '@/components/commons/input/TextInput';
import { useForm } from 'react-hook-form';

export default function ComponentTest() {
  const { register, handleSubmit, watch } = useForm();

  return (
    <form>
      <label htmlFor="name">test</label>
      <TextInput
        id="name"
        placeholder="test"
        register={{ ...register('name', { required: true }) }}
      />
    </form>
  );
}
