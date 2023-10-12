import { useCallback, useMemo, useState } from 'react';

import { TokenContext } from './TokenContext';
import {
  OnTokenSaveProps,
  TokenContextControllerProps,
} from './TokenContext.types';

export const tokenStorageKey = 'access_token';

export const TokenContextController = ({
  children,
}: TokenContextControllerProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem(tokenStorageKey),
  );
  const onTokenSave = useCallback(
    ({ newToken, storeTokenInStorage }: OnTokenSaveProps) => {
      setAccessToken(newToken);

      if (storeTokenInStorage) {
        localStorage.setItem(tokenStorageKey, newToken);
      }
    },
    [],
  );

  // const onTokenClear = useCallback(() => {
  //   setAccessToken(null);
  //   localStorage.removeItem(tokenStorageKey);
  // }, []);

  const contextValue = useMemo(
    () => ({
      accessToken,
      onTokenSave,
      //  onTokenClear,
    }),
    [
      accessToken,
      onTokenSave,
      //    onTokenClear
    ],
  );

  return (
    <TokenContext.Provider value={contextValue}>
      {children}
    </TokenContext.Provider>
  );
};
