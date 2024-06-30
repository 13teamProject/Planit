declare module '@planit-types' {
  export type Dashboard = {
    id: number;
    title: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    createdByMe: boolean;
    userId: number;
  };
  export type DashboardResponse = {
    id: number;
    title: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    createdByMe: boolean;
  };

  export type DashboardListResponse = {
    dashboards: DashboardResponse[];
  };

  export type DashboardUpdateData = {
    title: string;
    color: string;
  };

  export type DashboardFormData = {
    title: string;
    color: string;
  };

  export type DashboardEditRequest = {
    title: string;
    color: string;
  };
  export type DashboardEditResponse = {
    id: number;
    title: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    createdByMe: boolean;
  };

  type ColorMapping = {
    [key: string]: string;
  };
}
