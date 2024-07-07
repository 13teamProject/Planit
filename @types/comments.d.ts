declare module '@planit-types' {
  // 공통
  export type Comment = {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    cardId: number;
    author: CommentAuthor;
  };

  export type CommentAuthor = {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };

  // 댓글 생성
  export type PostCommentRequest = {
    content: string;
    cardId: number;
    columnId: number;
    dashboardId: number;
  };

  // 댓글 목록 조회
  export type GetCommentRequest = {
    cursorId?: number | null;
    cardId: number;
    size?: number;
  };

  export type CommentResponse = {
    cursorId: number;
    comments: Comment[];
  };
}
