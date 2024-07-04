declare module '@planit-types' {
  // 공통
  export type Assignee = {
    id: number;
    nickname: string;
    profileImageUrl: string | null;
  };

  type CardResponse = {
    id: number;
    title: string;
    description: string;
    tags: string[];
    dueDate: string | null;
    assignee: Assignee | null;
    imageUrl: string | null;
    teamId: string;
    columnId: number;
    dashboardId: number;
    createdAt: string;
    updatedAt: string;
  };

  // 카드 생성
  export type CreateCardRequest = {
    assigneeUserId?: number;
    dashboardId: number;
    columnId: number;
    title: string;
    description: string;
    dueDate?: string;
    tags?: string[];
    imageUrl?: string;
  };

  export type CreateCardResponse = CardResponse;

  // 카드 수정
  export type EditCardRequest = {
    columnId: number;
    assigneeUserId?: number;
    title: string;
    description: string;
    dueDate?: string;
    tags?: string[];
    imageUrl?: string;
  };

  export type EditCardResponse = CardResponse;

  // 카드 상세 조회
  export type TodoDetailsCardResponse = CardResponse;

  // FIXME: 중복
  export type GetCardResponse = CardResponse;

  // 카드 이미지 업로드
  export type CardImageResponse = {
    imageUrl: string;
  };
}
