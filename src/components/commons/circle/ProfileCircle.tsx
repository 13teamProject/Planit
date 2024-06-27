import Image from 'next/image';

type Member = {
  // id: number;
  // userId: number;
  // email: string;
  nickname: string;
  profileImageUrl: string | null;
  // createdAt: string;
  // updatedAt: string;
  // isOwner: boolean;
};

type Props = {
  data: Member;
  styles: string;
};

export default function ProfileCircle({ styles, data }: Props) {
  const { profileImageUrl, nickname } = data;

  return (
    <div
      className={`relative flex items-center justify-center rounded-full ring-2 ring-white ${styles}`}
    >
      {profileImageUrl ? (
        <Image
          src={profileImageUrl}
          fill
          alt="profile"
          className="absolute rounded-full object-cover"
        />
      ) : (
        <span className="text-white">{nickname[0]}</span>
      )}
    </div>
  );
}
