import HamburgerLink from "../link/hamburger-link";
import SignoutBtn from "../signout-btn/signout-btn";
import styles from '@/styles/modules/components/header/hamburger-menu/links/player/player-links.module.scss';

export default function PlayerLinks() {
  return (
    <>
      <HamburgerLink href="/challengerwelcome" className={styles.take_the_challenge_btn}>
        Take The Challenge
      </HamburgerLink>
      <HamburgerLink href={"/actions"} className={styles.link_lg_top}>
        Take Action
      </HamburgerLink>
      <HamburgerLink href={"/why8by8"} className={styles.link_lg}>Why 8by8</HamburgerLink>
      <HamburgerLink href={"/rewards"} className={styles.link_lg}>Rewards</HamburgerLink>
      <HamburgerLink href={"/faq"} className={styles.link_lg}>FAQS</HamburgerLink>
      <HamburgerLink href="/privacy" className={styles.link_sm_top}>Privacy Policy</HamburgerLink>
      <HamburgerLink href="/settings" className={styles.link_sm}>Settings</HamburgerLink>
      <SignoutBtn />
    </>
  );
}