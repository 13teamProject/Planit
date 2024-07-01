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
