import HamburgerLink from "../hamburger-link";
import styles from '@/styles/modules/components/header/hamburger-links/hamburger-links-signed-out.module.scss';

type HamburgerLinksSignedOutProps = {
  hideMenu:() => void;
}

export default function HamburgerLinksSignedOut({hideMenu}:HamburgerLinksSignedOutProps) {

  return (
    <>
      <HamburgerLink hideMenu={hideMenu} href="/challengerwelcome" className={styles.take_the_challenge_btn}>
        Take The Challenge
      </HamburgerLink>
      <HamburgerLink
        hideMenu={hideMenu} 
        href={"/actions"}
        className={styles.link_lg_top}
      >
        Take Action
      </HamburgerLink>
      <HamburgerLink hideMenu={hideMenu} href={"/why8by8"} className={styles.link_lg}>Why 8by8</HamburgerLink>
      <HamburgerLink hideMenu={hideMenu} href={"/rewards"} className={styles.link_lg}>Rewards</HamburgerLink>
      <HamburgerLink hideMenu={hideMenu} href={"/faq"} className={styles.link_lg}>FAQS</HamburgerLink>
      <HamburgerLink hideMenu={hideMenu} href="/privacy" className={styles.link_sm_top}>Privacy Policy</HamburgerLink>
      <HamburgerLink hideMenu={hideMenu} href="/settings" className={styles.link_sm}>Settings</HamburgerLink>
      <HamburgerLink hideMenu={hideMenu} href="/signup" className={styles.link_sm}>Sign up</HamburgerLink>
    </>
  );
}