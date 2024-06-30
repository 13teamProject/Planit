import { getDashboards, postDashboards } from '@/app/api/dashboards';
import { Dashboard } from '@planit-types';
import create from 'zustand';

interface DashboardState {
  dashboards: Dashboard[];
  fetchDashboards: () => Promise<void>;
  addDashboard: (dashboard: Dashboard) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  dashboards: [],
  fetchDashboards: async () => {
    const response = await getDashboards('infiniteScroll', 1, 100);
    set({
      dashboards: response.dashboards.map((data) => ({
        id: data.id,
        title: data.title,
        color: data.color,
      })),
    });
  },
  addDashboard: (dashboard: Dashboard) => {
    set((state) => ({
      dashboards: [...state.dashboards, dashboard],
    }));
  },
}));
