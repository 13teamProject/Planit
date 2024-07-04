declare module '@planit-types' {
  // 공통
  export type Member = {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
    isOwner: boolean;
    userId: number;
  };

  // 대시보드 멤버 목록 조회
  export type MemberListResponse = {
    members: Member[];
    totalCount: number;
  };
}
