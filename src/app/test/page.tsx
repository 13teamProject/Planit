import ColorCircle from '@/components/commons/circle/ColorCircle';
import ProfileCircle from '@/components/commons/circle/ProfileCircle';
import Tag from '@/components/commons/tag/Tag';

export default function ComponentTest() {
  return (
    <>
      <ColorCircle color="bg-toss-blue" size="sm" />
      <ProfileCircle color="bg-[#a3c4a2]" size="lg">
        <span className="font-bold text-white">B</span>
      </ProfileCircle>
      <Tag color="toss" text="To do" size="lg" round={true} />
      <Tag color="pink" text="프로젝트" size="sm" />
    </>
  );
}
