declare module '@planit-types' {
  export type UpdateUser = {
    nickname: string;
    profileImageUrl?: string;
  };
  export type UpdateUserPassword = {
    password: string;
    newPassword: string;
  };
}
