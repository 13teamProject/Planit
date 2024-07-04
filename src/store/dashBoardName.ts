import create from 'zustand';
import { persist } from 'zustand/middleware';

type NameState = {
  dashboardName: string | null;
  setData: (newName: string) => void;
};

export const useDashboardNameChange = create<NameState>()(
  persist(
    (set) => ({
      dashboardName: null,
      setData: (newName) => set({ dashboardName: newName }),
    }),
    {
      name: 'dashboard-name', // 로컬 스토리지에 저장될 키 이름
      getStorage: () => localStorage, // 스토리지 유형 지정
    },
  ),
);
