import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { UserInfoResponse } from '../../types';

type AuthState = {
  isLoggedIn: boolean;
  userInfo: UserInfoResponse | null;
  login: (user: UserInfoResponse) => void;
  logout: () => void;
  changeUserInfo: (userInfo: UserInfoResponse) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userInfo: null,
      login: (userInfo) => set({ isLoggedIn: true, userInfo }),
      logout: () => {
        set({ isLoggedIn: false, userInfo: null });
        localStorage.removeItem('auth-storage');
      },
      changeUserInfo: (userInfo) => set({ userInfo }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
