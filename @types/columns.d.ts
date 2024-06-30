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
}
