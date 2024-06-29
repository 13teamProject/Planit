declare module '@planit-types' {
  export type Column = {
    id: number;
    title: string;
    teamId: string;
    dashboardId: number;
    createdAt: string;
    updatedAt: string;
  };

  export type ColumnsListResponse = {
    result: string;
    data: Column[];
  };

  export type CreateColumnRequest = {
    title: string;
    dashboardId: number;
  };

  export type CreateColumnResponse = {
    id: number;
    title: string;
    teamId: string;
    createdAt: string;
    updatedAt: string;
  };
}
