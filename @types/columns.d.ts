declare module '@planit-types' {
  // 공통
  export type Column = {
    id: number;
    title: string;
    teamId: string;
    dashboardId: number;
    createdAt: string;
    updatedAt: string;
  };

  type ColumnResponse = {
    id: number;
    title: string;
    teamId: string;
    createdAt: string;
    updatedAt: string;
  };

  // 컬럼 생성
  export type CreateColumnRequest = {
    title: string;
    dashboardId: number;
  };

  export type CreateColumnResponse = ColumnResponse;

  // 컬럼 목록 조회
  export type ColumnsListResponse = {
    result: string;
    data: Column[];
  };

  // 컬럼 수정
  export type EditColumnRequest = {
    title: string;
  };

  export type EditColumnResponse = ColumnResponse;
}
