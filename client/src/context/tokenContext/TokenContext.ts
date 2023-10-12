import { createContext } from 'react';

import { TokenContextValue } from './TokenContext.types';

export const TokenContext = createContext<TokenContextValue | undefined>(
  undefined,
);
