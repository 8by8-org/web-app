import { useContext } from "react";
import { UserContext } from "@/contexts/user-context";
import { UserType } from "@/models/UserType";
import ChallengerLinks from "./challenger-links";
import HybridLinks from "./hybrid-links";
import PlayerLinks from "./player-links";
import SignedOutLinks from "./signed-out-links";

export default function Links() {
  const {activeUser} = useContext(UserContext);

  if(activeUser) {
    switch(activeUser.type) {
      case UserType.PLAYER :
        return <PlayerLinks />;
      case UserType.CHALLENGER :
        return <ChallengerLinks />;
      case UserType.HYBRID :
        return <HybridLinks />
    }
  } else {
    return <SignedOutLinks />
  }
}