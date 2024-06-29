declare module '@planit-types' {
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
