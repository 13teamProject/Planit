declare module '@planit-api' {
  export type Assignee = {
    id: number;
    nickname: string;
    profileImageUrl: string | null;
  };

  export type CreateCardRequest = {
    assigneeUserId: number;
    dashboardId: number;
    columnId: number;
    title: string;
    description: string;
    dueDate?: string;
    tags?: string[];
    imageUrl?: string;
  };

  export type CreateCardResponse = {
    id: number;
    title: string;
    description: string;
    tags: string[];
    dueDate: string;
    assignee: Assignee;
    imageUrl: string;
    teamId: string;
    columnId: number;
    dashboardId: number;
    createdAt: string;
    updatedAt: string;
  };

  export type CardImageResponse = {
    imageUrl: string;
  };
}
