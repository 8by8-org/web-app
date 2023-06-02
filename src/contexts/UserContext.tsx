import {createContext, PropsWithChildren, useState } from "react";
import { User } from "@/models/User";
import { Builder } from "builder-pattern";
import { UserType } from "@/models/UserType";

type UserContextType = {
  activeUser:ActiveUser;
}

type ActiveUser = User | null;

//setting the default context to {activeUser:null} allows for testing unwrapped components
export const UserContext = createContext<UserContextType>({activeUser: null});

export function UserContextProvider({children}:PropsWithChildren) {
  const user = Builder(User).name("Joe").type(UserType.CHALLENGER).build();
  
  const [activeUser,setActiveUser] = useState<ActiveUser>(user);

  return <UserContext.Provider value={{activeUser}}>{children}</UserContext.Provider>
}

