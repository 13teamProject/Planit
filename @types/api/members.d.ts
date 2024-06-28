declare module '@planit-api' {
  export type Member = {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: null;
    createdAt: string;
    updatedAt: string;
    isOwner: boolean;
    userId: number;
  };

  export type MemberListResponse = {
    members: Member[];
    totalCount: number;
  };
}
