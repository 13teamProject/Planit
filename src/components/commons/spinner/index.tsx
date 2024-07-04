import { ClipLoader } from 'react-spinners';

type Props = {
  size: number;
};
export default function Spinner({ size }: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ClipLoader size={size} color="#0064FF" speedMultiplier={1} />
    </div>
  );
}
