import { UserInfoResponse } from '@planit-api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  isLoggedIn: boolean;
  userInfo: UserInfoResponse | null;
  login: (user: UserInfoResponse) => void;
  logout: () => void;
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
    }),
    {
      name: 'auth-storage',
    },
  ),
);
