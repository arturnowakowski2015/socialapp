import { ReactNode } from "react";

import { TokenContextController } from "../context/tokenContext/TokenContextController";

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <TokenContextController>{children}</TokenContextController>
);
