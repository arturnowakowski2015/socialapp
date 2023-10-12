import { useContext } from 'react';

import { TokenContext } from './TokenContext';

export const useTokenContext = () => {
  const ctx = useContext(TokenContext);

  if (!ctx) {
    throw new Error(
      'useTokenContext can only be used inside TokenContextController.',
    );
  }

  return ctx;
};
