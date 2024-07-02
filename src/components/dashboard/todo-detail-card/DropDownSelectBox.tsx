import { deleteTodoCardDetails } from '@/app/api/cards';
import Button from '@/components/commons/button';
import Modal from '@/components/commons/modal';
import useOutsideClick from '@/hooks/useOutsideClick';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  id: number;
  openEditModal: () => void;
  setSelectBoxIsOpen: Dispatch<SetStateAction<boolean>>;
  todoModalOnClose: () => void;
};

export default function DropDownSelectBox({
  id,
  openEditModal,
  setSelectBoxIsOpen,
  todoModalOnClose,
}: Props) {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const dropdownRef = useOutsideClick<HTMLUListElement>(() => {
    setSelectBoxIsOpen(false);
  });

  const openDeleteModal = () => {
    setDeleteModalIsOpen(true);
  };

  const cancelDelete = () => {
    setDeleteModalIsOpen(false);
    setSelectBoxIsOpen(false);
  };

  const handleDelete = async () => {
    const res = await deleteTodoCardDetails(id);
    if ('message' in res) {
      toast.error(res.message);
      return;
    }
    toast.success('성공적으로 삭제되었습니다.');
    todoModalOnClose();
  };

  return (
    <ul
      ref={dropdownRef}
      className="mt-1 flex h-74 w-86 flex-col gap-1 rounded-b-xl rounded-t-xl border bg-white p-6 text-center sm:right-0 md:h-82 md:w-93 md:gap-6"
    >
      <li>
        <button
          className="h-30 w-74 rounded-4 pt-3 text-12 hover:bg-toss-blue-light/40 hover:text-toss-blue md:h-32 md:w-81 md:text-14"
          type="button"
          onClick={openEditModal}
        >
          수정하기
        </button>
      </li>
      <li>
        <button
          className="h-30 w-74 rounded-4 pt-3 text-12 hover:bg-toss-blue-light/40 hover:text-toss-blue md:h-32 md:w-81 md:text-14"
          type="button"
          onClick={openDeleteModal}
        >
          삭제하기
        </button>
        <Modal isOpen={deleteModalIsOpen} onClose={() => {}}>
          <div className="modal-content m-auto px-54 pb-29 pt-26 text-right text-18 md:w-540 md:px-33">
            <p className="pb-47 pt-50 text-center">삭제하시겠습니까?</p>
            <span className="flex justify-center gap-5 md:justify-end">
              <Button
                styles="w-138 h-42 md:w-120 md:h-48"
                text="취소"
                onClick={cancelDelete}
                cancel
              />
              <Button
                styles="w-138 h-42 md:w-120 md:h-48"
                text="확인"
                onClick={handleDelete}
              />
            </span>
          </div>
        </Modal>
      </li>
    </ul>
  );
}
