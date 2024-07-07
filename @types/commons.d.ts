declare module '@planit-types' {
  export type SuccessMessage = {
    success: true;
  };

  export type ErrorMessage = {
    message: string;
  };

  export type ColorMapping = {
    [key: string]: string;
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
