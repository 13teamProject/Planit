declare module '@planit-types' {
  // 공통
  export type Dashboard = {
    id: number;
    title: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    createdByMe: boolean;
    userId: number;
  };

  export type DashboardFormValues = {
    dashboardName: string;
  };

  export type EmailRequest = {
    email: string;
  };

  // 대시보드 생성
  export type DashboardFormData = {
    title: string;
    color: string;
  };

  export type DashboardResponse = {
    id: number;
    title: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    createdByMe: boolean;
    userId: number;
  };

  // 대시보드 목록 조회
  export type DashboardListResponse = {
    cursorId: number | null;
    totalCount: number;
    dashboards: Dashboard[];
  };

  // 대시보드 상세 조회
  export type GetDashboardIdResponse = {
    id: number;
    title: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    createdByMe: boolean;
    userId: number;
  };

  // 대시보드 수정
  export type DashboardUpdateData = {
    title: string;
    color: string;
  };

  // FIXME: 중복
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

  // 대시보드 초대하기
  export type Invitation = {
    id: number;
    teamId: string;
    inviter: {
      id: number;
      email: string;
      nickname: string;
    };
    dashboard: {
      id: number;
      title: string;
    };
    invitee: {
      id: number;
      email: string;
      nickname: string;
    };
    inviteAccepted: null | boolean;
    createdAt: string;
    updatedAt: string;
  };

  // 대시보드 초대 불러오기
  export type DashboardInvitationResponse = {
    totalCount: number;
    invitations: Invitation[];
  };
}
