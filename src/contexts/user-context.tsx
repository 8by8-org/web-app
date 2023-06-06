import {createContext, PropsWithChildren, useState } from "react";
import { User } from "@/models/User";
import { UserType } from "@/models/UserType";

export type UserContextType = {
  activeUser:ActiveUser;
}

type ActiveUser = User | null;

//setting the default context to {activeUser:null} allows for testing unwrapped components
export const UserContext = createContext<UserContextType>({activeUser: null});

export function UserContextProvider({children}:PropsWithChildren) {
  const [activeUser,setActiveUser] = useState<ActiveUser>(null);
  return <UserContext.Provider value={{activeUser}}>{children}</UserContext.Provider>
}

