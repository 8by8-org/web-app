import HamburgerLink from "../hamburger-link";
import styles from '@/styles/modules/components/header/hamburger-links/hamburger-links-challenger.module.scss';

type HamburgerLinksChallengerProps = {
  hideMenu:() => void;
}

export default function HamburgerLinksChallenger({hideMenu}:HamburgerLinksChallengerProps) {

  return (
    <>
      <HamburgerLink 
        hideMenu={hideMenu} 
        href={"/progress"}
        className={styles.link_lg_top}
      >
        My Challenge
      </HamburgerLink>
      <HamburgerLink hideMenu={hideMenu} href={"/why8by8"} className={styles.link_lg}>Why 8by8</HamburgerLink>
      <HamburgerLink hideMenu={hideMenu} href={"/rewards"} className={styles.link_lg}>Rewards</HamburgerLink>
      <HamburgerLink hideMenu={hideMenu} href={"/faq"} className={styles.link_lg}>FAQS</HamburgerLink>
      <HamburgerLink hideMenu={hideMenu} href="/privacy" className={styles.link_sm_top}>Privacy Policy</HamburgerLink>
      <HamburgerLink hideMenu={hideMenu} href="/settings" className={styles.link_sm}>Settings</HamburgerLink>
      <HamburgerLink hideMenu={hideMenu} href="/signout" className={styles.link_sm}>Sign out</HamburgerLink>
    </>
  );
}
