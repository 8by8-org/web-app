import HamburgerLink from "./hamburger-link";
import styles from '@/styles/modules/components/header/hamburger-menu/links/signed-out-links.module.scss';

export default function SignedOutLinks() {
  return (
    <>
      <HamburgerLink href="/challengerwelcome" className={styles.take_the_challenge_btn}>Take The Challenge</HamburgerLink>
      <HamburgerLink href="/actions" className={styles.link_lg_top}>Take Action</HamburgerLink>
      <HamburgerLink href="/why8by8" className={styles.link_lg}>Why 8by8</HamburgerLink>
      <HamburgerLink href="/rewards" className={styles.link_lg}>Rewards</HamburgerLink>
      <HamburgerLink href="/faq" className={styles.link_lg}>FAQS</HamburgerLink>
      <HamburgerLink href="/privacy-policy" className={styles.link_sm_top}>Privacy Policy</HamburgerLink>
      <HamburgerLink href="/settings" className={styles.link_sm}>Settings</HamburgerLink>
      <HamburgerLink href="/signup" className={styles.link_sm}>Sign up</HamburgerLink>
    </>
  );
}