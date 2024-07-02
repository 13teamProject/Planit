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
    createdByMe: boolean;
    userId: number;
    cursorId: number;
    totalCount: number;
    dashboards: Array<{
      id: number;
      title: string;
      color: string;
      createdAt: string;
      updatedAt: string;
      createdByMe: boolean;
      userId: number;
    }>;
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

  type FormValues = {
    dashboardName: string;
  };

  type SuccessMessage = {
    success: true;
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

  export type GetDashboardIdResponse = {
    id: number;
    title: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    createdByMe: boolean;
    userId: number;
  };

  export type ColorMapping = {
    [key: string]: string;
  };

  export type EmailRequest = {
    email: string;
  };

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

  export type DashboardInvitationResponse = {
    totalCount: number;
    invitations: Invitation[];
  };
}
