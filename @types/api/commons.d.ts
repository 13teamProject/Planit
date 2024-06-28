declare module '@planit-api' {
  export type ErrorMessage = {
    message: string;
  };

  export type ModalState = {
    isOpen: boolean;
    message: string;
  };
}
