import { Rewards } from "@/models/Rewards";
import { createContext, PropsWithChildren, useState } from "react";

export type RewardsContextType = {
    rewardsInfo:RewardsInfo;
}

type RewardsInfo = Rewards | null;

//setting the default context to {rewardsInfo:null} allows for testing unwrapped components
export const RewardsContext = createContext<RewardsContextType>({rewardsInfo: null});

export function RewardsContextProvider({children}:PropsWithChildren) {
  const [rewardsInfo,setRewardsInfo] = useState<RewardsInfo>(null);
  return <RewardsContext.Provider value={{rewardsInfo}}>{children}</RewardsContext.Provider>
}

