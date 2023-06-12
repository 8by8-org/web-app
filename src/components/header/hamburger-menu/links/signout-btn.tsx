import { useContext } from "react";
import { HeaderContext } from "@/components/header/header-context";
import styles from '@/styles/modules/components/header/hamburger-menu/links/signout-btn.module.scss';

export default function SignoutBtn() {
  const {openSignoutModal} = useContext(HeaderContext);

  return <li><button className={styles.signout_btn} onClick={openSignoutModal}>Sign out</button></li>
}