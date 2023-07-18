import { useContext } from "react";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { HeaderContext } from "./header-context";
import { HamburgerMenuState } from "./header-context";
import styles from '@/styles/modules/components/header/icons-tray.module.scss';
import feedback from "../../../public/assets/4-pages/Header/Feedback.svg";

export default function IconsTray() {
  const {hamburgerMenuState, openHamburgerMenu, openHamburgerMenuBtnRef} = useContext(HeaderContext);

  return (
    <div className={hamburgerMenuState !== HamburgerMenuState.open ? styles.icons_tray : "hidden"}>
      <button
        onClick={() =>
          window.open("https://forms.gle/r33L2NAKT69MrvsZ7", "_blank")
        }
        className={styles.feedback_btn}
        aria-label="open feedback form"
      >
        <Image src={feedback} alt="feedback icon" className={styles.feedback_btn_icon}/>
      </button>
      <button 
        className={styles.hamburger_btn} 
        onClick={openHamburgerMenu}
        aria-label="open navigation menu"
        ref={openHamburgerMenuBtnRef}
      >
        <FaBars />
      </button>
    </div>
  )
}