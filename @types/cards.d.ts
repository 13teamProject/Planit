declare module '@planit-types' {
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
    imageUrl?: string | null;
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

  export type TodoDetailsCardResponse = {
    id: number;
    title: string;
    description: string;
    tags: string[];
    dueDate: string | null;
    assignee: Assignee;
    imageUrl: string | null;
    teamId: string;
    columnId: number;
    createdAt: string;
    updatedAt: string;
  };

  export type EditCardRequest = {
    columnId: number;
    assigneeUserId: number;
    title: string;
    description: string;
    dueDate: string | null;
    tags: string[];
    imageUrl?: string | null;
  };

  export type EditCardResponse = {
    id: number;
    title: string;
    description: string;
    tags?: string[];
    dueDate?: string;
    assignee: Assignee;
    imageUrl?: string;
    teamId: string;
    columnId: number;
    createdAt: string;
    updatedAt: string;
  };

  export type GetCardResponse = {
    id: number;
    title: string;
    description: string;
    tags: string[];
    dueDate: string;
    assignee: {
      nickname: string;
      id: number;
      profileImageUrl: string;
    };
    imageUrl: string;
    teamId: string;
    columnId: number;
    createdAt: string;
    updatedAt: string;
  };
}
