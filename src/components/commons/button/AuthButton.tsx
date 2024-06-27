'use client';

type AuthButtonProps = {
  text: string;
  disabled: boolean;
};

export default function AuthButton({
  text,
  disabled = false,
}: AuthButtonProps) {
  return (
    <button
      type="submit"
      className="mt-21 h-50 w-full rounded-8 bg-toss-blue text-18 text-white hover:bg-toss-blue/95 disabled:bg-gray-300"
      disabled={disabled}
    >
      {text}
    </button>
  );
}
