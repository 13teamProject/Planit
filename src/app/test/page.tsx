import ColorCircle from '@/components/commons/circle/ColorCircle';
import ProfileCircle from '@/components/commons/circle/ProfileCircle';

export default function ComponentTest() {
  return (
    <>
      <ColorCircle color="bg-toss-blue" size="sm" />
      <ProfileCircle color="bg-[#a3c4a2]" size="lg">
        <span className="font-bold text-white">B</span>
      </ProfileCircle>
    </>
  );
}
