import ColorCircle from '@/components/commons/circle/ColorCircle';
import ProfileCircle from '@/components/commons/circle/ProfileCircle';
import Tag from '@/components/commons/tag';

export default function ComponentTest() {
  return (
    <>
      <ColorCircle color="bg-toss-blue" size="sm" />
      <ProfileCircle color="bg-[#a3c4a2]" size="lg">
        <span className="font-bold text-white">B</span>
      </ProfileCircle>
      <Tag color="toss" size="lg" round={true}>
        <ColorCircle size="sm" color="bg-toss-blue" />
        To do
      </Tag>
      <Tag color="pink" size="sm">
        프로젝트
      </Tag>
      <Tag color="green" size="lg">
        백엔드
      </Tag>
    </>
  );
}
