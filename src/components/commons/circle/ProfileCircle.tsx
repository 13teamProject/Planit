import Image from 'next/image';

type User = {
  nickname: string;
  profileImageUrl: string | null;
};

type Props = {
  data: User;
  styles: string;
};

export default function ProfileCircle({ styles, data }: Props) {
  const { profileImageUrl, nickname } = data;

  return (
    <div
      className={`relative flex transform cursor-pointer items-center justify-center rounded-full text-white ring-2 ring-white transition-transform duration-200 ease-in-out hover:scale-110 ${styles}`}
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
