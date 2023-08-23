import { Inviter } from "@/models/Inviter";
import { createContext, PropsWithChildren, useState } from "react";

export type InviterContextType = {
  inviterInfo:InviterInfo;
}

type InviterInfo = Inviter | null;

//setting the default context to {activeUser:null} allows for testing unwrapped components
export const InviterContext = createContext<InviterContextType>({inviterInfo: null});

export function InviterContextProvider({children}:PropsWithChildren) {
  const [inviterInfo,setInviterInfo] = useState<InviterInfo>(null);
  return <InviterContext.Provider value={{inviterInfo}}>{children}</InviterContext.Provider>
}

