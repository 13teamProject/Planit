'use client';

type AuthButtonProps = {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
};

export default function AuthButton({
  text,
  disabled = false,
  onClick,
}: AuthButtonProps) {
  return (
    <button
      type="submit"
      className="h-50 text-18 rounded-8 w-full bg-toss-blue text-white hover:bg-blue-400 disabled:cursor-default disabled:bg-gray-300"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
