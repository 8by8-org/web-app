import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { UserType } from "@/models/UserType";
import HamburgerLinksPlayer from "./hamburger-links-player/hamburger-links-player";
import HamburgerLinksChallenger from "./hamburger-links-challenger/hamburger-links-challenger";
import HamburgerLinksHybrid from "./hamburger-links-hybrid/hamburger-links-hybrid";
import HamburgerLinksSignedOut from "./hamburger-links-signed-out/hamburger-links-signed-out";

type HamburgerLinksProps = {
  hideMenu:() => void;
}

export default function HamburgerLinks({hideMenu}:HamburgerLinksProps) {
  const {activeUser} = useContext(UserContext);

  if(activeUser) {
    switch(activeUser.type) {
      case UserType.PLAYER :
        return <HamburgerLinksPlayer hideMenu={hideMenu} />;
      case UserType.CHALLENGER :
        return <HamburgerLinksChallenger hideMenu={hideMenu} />;
      case UserType.HYBRID :
        return <HamburgerLinksHybrid hideMenu={hideMenu} />
    }
  } else {
    return <HamburgerLinksSignedOut hideMenu={hideMenu} />
  }
}