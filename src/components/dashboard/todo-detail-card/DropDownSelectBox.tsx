export default function DropDownSelectBox() {
  return (
    <ul className="mt-1 flex h-74 w-86 flex-col gap-1 rounded-b-xl rounded-t-xl border bg-white p-6 text-center sm:right-0 md:h-82 md:w-93 md:gap-6">
      <li>
        <button
          className="h-30 w-74 rounded-4 pt-3 text-12 hover:bg-toss-blue-light/40 hover:text-toss-blue md:h-32 md:w-81 md:text-14"
          type="button"
        >
          수정하기
        </button>
      </li>
      <li>
        <button
          className="h-30 w-74 rounded-4 pt-3 text-12 hover:bg-toss-blue-light/40 hover:text-toss-blue md:h-32 md:w-81 md:text-14"
          type="button"
        >
          삭제하기
        </button>
      </li>
    </ul>
  );
}
