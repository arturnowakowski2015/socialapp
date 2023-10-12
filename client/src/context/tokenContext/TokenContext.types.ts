import { ReactNode } from 'react';

export type TokenContextValue = {
  accessToken: string | null;
  onTokenSave: (props: OnTokenSaveProps) => void;
  // onTokenClear: () => void;
};

export type TokenContextControllerProps = {
  children: ReactNode;
};

export type OnTokenSaveProps = {
  newToken: string;
  storeTokenInStorage: boolean;
};
