declare module '@planit-types' {
  export type ErrorMessage = {
    message: string;
  };

  type SuccessMessage = {
    success: true;
  };

  export type ModalState = {
    isOpen: boolean;
    message: string;
  };

  export type ContentModalState = {
    isOpen: boolean;
    message: string;
    isContent?: boolean;
  };
}
