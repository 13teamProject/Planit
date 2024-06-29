declare module '@planit-api' {
  export type UserInfoResponse = {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };

  export type UpdateUser = {
    nickname: string;
    profileImageUrl?: string;
  };
  export type UpdateUserPassword = {
    password: string;
    newPassword: string;
  };
}
