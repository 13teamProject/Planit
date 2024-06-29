export default function CommentInput() {
  return (
    <div className="w-full md:max-w-420 lg:max-w-450">
      <label className="pb-8 md:pb-10" htmlFor="comment">
        댓글
      </label>
      <div className="flex h-70 rounded-md border border-gray-200 p-12 selection:rounded-md focus:border-toss-blue md:h-110">
        <textarea
          id="comment"
          className="w-full resize-none rounded-md pr-3 text-12 outline-none placeholder:text-gray-300"
        />
        <button
          className="relative left-4 top-23 h-28 w-84 rounded-4 border text-12 text-toss-blue md:top-58 md:h-32 md:w-77"
          type="submit"
        >
          입력
        </button>
      </div>
    </div>
  );
}
