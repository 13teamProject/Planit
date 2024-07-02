'use client';

import { getColumns, postCreateColumn } from '@/app/api/columns';
import Button from '@/components/commons/button';
import Input from '@/components/commons/input';
import Modal from '@/components/commons/modal';
import { Column, CreateColumnRequest } from '@planit-types';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  dashboardId: number;
};

export type CreatColumnInputs = {
  columnTitle: string;
};

export default function CreateColumnModal({
  dashboardId,
  isOpen,
  onClose,
}: Props) {
  const [columnList, setColumnList] = useState<Column[]>([]);
  const [error, setError] = useState('');
  const { register, handleSubmit, reset, watch } = useForm<CreatColumnInputs>();
  const inputValue = watch('columnTitle');

  const onSubmit: SubmitHandler<CreatColumnInputs> = async ({
    columnTitle,
  }) => {
    if (error) return;

    const reqBody: CreateColumnRequest = {
      dashboardId,
      title: columnTitle,
    };

    const res = await postCreateColumn(reqBody);

    if ('message' in res) {
      toast.error(res.message);
      return;
    }

    onClose();
    reset();
  };

  useEffect(() => {
    if (!isOpen) return;

    (async () => {
      const columnRes = await getColumns(dashboardId);

      if ('message' in columnRes) {
        toast.error(columnRes.message);
        return;
      }

      setColumnList(columnRes.data);
    })();
  }, [isOpen]);

  useEffect(() => {
    const columnTitleList = columnList.map((column) => column.title);
    if (columnTitleList.includes(inputValue)) {
      setError('중복된 컬럼 이름입니다.');
    } else setError('');
  }, [inputValue, columnList]);

  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <form className="w-327 px-20 py-28 md:w-540 md:px-28 md:py-32">
        <h1 className="text-20 font-bold md:text-24">새 컬럼 생성</h1>

        <label
          htmlFor="columnTitle"
          className="mb-10 mt-24 block text-16 text-black-800 md:mt-32 md:text-18"
        >
          이름
        </label>
        <Input
          id="columnTitle"
          placeholder="컬럼을 입력해 주세요"
          error={!!error}
          register={{ ...register('columnTitle', { required: true }) }}
        />
        <span className="block pt-8 text-14 text-red-500">{error}</span>

        <div className="mt-24 flex gap-12 md:mt-28 md:justify-end">
          <Button
            onClick={() => {
              onClose();
              reset();
            }}
            styles="py-8 px-54 text-16 md:py-10 md:text-18 md:px-46 md:py-10"
            text="취소"
            cancel
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            styles="py-8 px-54 text-16 md:py-10 md:text-18 md:px-46 md:py-10"
            text="생성"
          />
        </div>
      </form>
    </Modal>
  );
}
