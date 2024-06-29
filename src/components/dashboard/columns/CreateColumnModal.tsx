'use client';

import postCreateColumn, { getColumns } from '@/app/api/columns';
import Button from '@/components/commons/button';
import Input from '@/components/commons/input';
import Modal from '@/components/commons/modal';
import { CreateColumnRequest } from '@planit-types';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

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
  const { register, handleSubmit, reset } = useForm<CreatColumnInputs>();

  const onSubmit: SubmitHandler<CreatColumnInputs> = async ({
    columnTitle,
  }) => {
    const reqBody: CreateColumnRequest = {
      dashboardId,
      title: columnTitle,
    };

    const res = await postCreateColumn(reqBody);

    if ('message' in res) alert(res.message);
    console.log(res);
    onClose();
    reset();
  };

  useEffect(() => {
    if (!isOpen) return;

    (async () => {
      const columnRes = await getColumns(dashboardId);

      if ('message' in columnRes) {
        alert(columnRes.message);
        // return;
      }

      // setStatusList(columnRes.data);
      // setMembers(memberRes.members);
      // setCurrentStatus(
      //   columnRes.data.filter(
      //     (each) => each.id === currentCardData.columnId,
      //   )[0],
      // );
      // setIsLoaded(true);
    })();
  }, [isOpen]);

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
          register={{ ...register('columnTitle', { required: true }) }}
        />

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
