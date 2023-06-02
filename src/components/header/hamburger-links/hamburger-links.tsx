import { PropsWithChildren, useContext } from "react";
import Link from "next/link";
import { UserContext } from "@/contexts/UserContext";
import { UserType } from "@/models/UserType";
import styles from '@/styles/modules/components/header/links/links.module.scss';

type HamburgerLinksProps = {
  hideMenu:() => void;
}

export default function HamburgerLinks({hideMenu}:HamburgerLinksProps) {
  const {activeUser} = useContext(UserContext);
  const showTakeChallenge = !activeUser || activeUser.type === UserType.PLAYER;
  const showTakeAction = !activeUser || (activeUser.type === UserType.PLAYER || activeUser.type === UserType.HYBRID)
  const showMyChallenge = activeUser && (activeUser.type === UserType.CHALLENGER || activeUser.type === UserType.HYBRID);

  return (
    <div className={styles.links}>
      {showTakeChallenge && 
        <li>
          <Link onClick={hideMenu} href="/challengerwelcome" role="button" className="btn_gradient btn_sm">
            Take The Challenge
          </Link>
        </li>
      }
      <div className={styles.links_inner_top}>
        {showMyChallenge &&
          <HamburgerLinkLg hideMenu={hideMenu} href={"/progress"}>My Challenge</HamburgerLinkLg>
        }
        {showTakeAction &&
          <HamburgerLinkLg hideMenu={hideMenu} href={"/actions"}>Take Action</HamburgerLinkLg>
        }
        <HamburgerLinkLg hideMenu={hideMenu} href={"/why8by8"}>Why 8by8</HamburgerLinkLg>
        <HamburgerLinkLg hideMenu={hideMenu} href={"/rewards"}>Rewards</HamburgerLinkLg>
        <HamburgerLinkLg hideMenu={hideMenu} href={"/faq"}>FAQS</HamburgerLinkLg>
      </div>
      <div className={styles.links_inner_bottom}>
        <HamburgerLinkSm hideMenu={hideMenu} href="/privacy">Privacy Policy</HamburgerLinkSm>
        <HamburgerLinkSm hideMenu={hideMenu} href="/settings">Settings</HamburgerLinkSm>
        <HamburgerLinkSm hideMenu={hideMenu} href="/signup">Sign up</HamburgerLinkSm>
      </div>
    </div>
  );
}

type HamburgerLinkProps = PropsWithChildren & {
  hideMenu:() => void;
  href:string;
  className?:string;
}

export function HamburgerLinkLg({hideMenu, href, children}:HamburgerLinkProps) {
  return <HamburgerLink hideMenu={hideMenu} href={href} className={styles.link_lg}>{children}</HamburgerLink>
}

export function HamburgerLinkSm({hideMenu, href, children}:HamburgerLinkProps) {
  return <HamburgerLink hideMenu={hideMenu} href={href} className={styles.link_sm}>{children}</HamburgerLink>
}

export function HamburgerLink({hideMenu, href, className, children}:HamburgerLinkProps) {
  return (
    <li>
      <Link onClick={hideMenu} href={href} className={className}>{children}</Link>
    </li>
  )
}
