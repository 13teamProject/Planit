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
  export type EmailRequest = {
    email: string;
  };

  type ColorMapping = {
    [key: string]: string;
  };

  //MyInvitation
  export type MyInvitation = {
    id: number;
    inviter: User;
    teamId: string;
    dashboard: Dashboard;
    invitee: User;
    inviteAccepted: boolean;
    createdAt: string;
    updatedAt: string;
  };

  export type MyInvitationsResponse = {
    cursorId: number;
    invitations: Invitation[];
  };

  export type MyInvitationResponse = {
    id: number;
    inviter: User;
    teamId: string;
    dashboard: Dashboard;
    invitee: User;
    inviteAccepted: boolean;
    createdAt: string;
    updatedAt: string;
  };

  type MyInivationErrorMessage = {
    message: string;
  };

  //initvation
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
