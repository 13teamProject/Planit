import { create } from 'zustand';

import { UserInfoResponse } from '../../types';

type AuthState = {
  isLoggedIn: boolean;
  userInfo: UserInfoResponse | null;
  login: (user: UserInfoResponse) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  userInfo: null,
  login: (userInfo) => set({ isLoggedIn: true, userInfo }),
  logout: () => set({ isLoggedIn: false, userInfo: null }),
}));
