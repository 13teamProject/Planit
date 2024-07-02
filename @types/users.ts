declare module '@planit-types' {
  // 내 정보 수정
  export type UpdateUser = {
    nickname: string;
    profileImageUrl: string | null;
  };

  // 비밀번호 변경
  export type UpdateUserPassword = {
    password: string;
    newPassword: string;
  };
}
