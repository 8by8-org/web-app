import HamburgerLink from "./hamburger-link";
import SignoutBtn from "./signout-btn";
import styles from '@/styles/modules/components/header/hamburger-menu/links/hybrid-links.module.scss';

export default function HybridLinks() {
  return (
    <>
      <HamburgerLink href="/progress" className={styles.link_lg_top}>My Challenge</HamburgerLink>
      <HamburgerLink href="/actions" className={styles.link_lg}>Take Action</HamburgerLink>
      <HamburgerLink href="/share" className={styles.link_lg}>Share</HamburgerLink>
      <HamburgerLink href="/why8by8" className={styles.link_lg}>Why 8by8</HamburgerLink>
      <HamburgerLink href="/rewards" className={styles.link_lg}>Rewards</HamburgerLink>
      <HamburgerLink href="/faq" className={styles.link_lg}>FAQS</HamburgerLink>
      <HamburgerLink href="/privacy-policy" className={styles.link_sm_top}>Privacy Policy</HamburgerLink>
      <HamburgerLink href="/settings" className={styles.link_sm}>Settings</HamburgerLink>
      <SignoutBtn />
    </>
  );
}