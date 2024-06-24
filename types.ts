export type UserInfoResponse = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type ErrorResponse = {
  success: boolean;
  message: string;
  data?: object;
};

export type UpdateUserFile = {
  nickname: string;
  profileImageUrl?: FileList;
};

export type UpdateUserUrl = {
  nickname: string;
  profileImageUrl?: string;
};
