import { getProfileColor } from '@/utils/color';
import classNames from 'classnames';
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
  const { profileImageUrl, nickname } = data || {
    profileImageUrl: null,
    nickname: '',
  };

  const classnames = classNames(
    'relative flex transform cursor-pointer shadow-xl items-center justify-center rounded-full text-white ring-[1.5px] ring-white transition-transform duration-200 ease-in-out hover:scale-110',
    styles,
    {
      [getProfileColor(nickname)]: profileImageUrl === null,
    },
  );

  return (
    <div className={classnames}>
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
