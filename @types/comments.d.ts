declare module '@planit-types' {
  type GetCommentRequest = {
    cursorId?: number | null;
    cardId: number;
    size?: number;
  };

  export type PostCommentRequest = {
    content: string;
    cardId: number;
    columnId: number;
    dashboardId: number;
  };

  export type CommentResponse = {
    cursorId: number;
    comments: Comment[];
  };

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
}
