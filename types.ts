export type ErrorResponse = {
  success: boolean;
  message: string;
  data?: object;
};

export type UpdateUser = {
  nickname: string;
  profileImageUrl?: string;
};

// Auth types
export type AuthInputs = {
  email: string;
  password: string;
  passwordConfirmation?: string;
  nickname?: string;
  terms?: boolean;
};

export type UserInfoResponse = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type SignUpResult = UserInfoResponse | BadRequest;

export type SignUpProps = {
  email: string;
  password: string;
  nickname: string | undefined;
};

export type BadRequest = {
  message: string;
};

export type LoginResponse = {
  accessToken: string;
  user: UserInfoResponse;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type LoginResult = LoginResponse | BadRequest;

// Modal type
export type ModalState = {
  isOpen: boolean;
  message: string;
};
