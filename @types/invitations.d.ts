declare module '@planit-types' {
  type User = {
    nickname: string;
    email: string;
    id: number;
  };

  // MyInvitation
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
}
