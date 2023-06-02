import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconContext } from "react-icons";
import {IoIosArrowForward} from "react-icons/io";
import {FaBars} from "react-icons/fa";
import Greeting from "./greeting/greeting";
import HamburgerLinks from "./hamburger-links/hamburger-links";
import SignoutModal from "./signout-modal/signout-modal";
import feedback from "../../../public/assets/4-pages/Header/Feedback.svg";
import logo from "../../../public/assets/logos/white-logo.svg";
import styles from "../../styles/modules/components/header/header.module.scss";


type HeaderProps = {
  isPreview : boolean;
}

enum HamburgerMenuState {
  open,
  opening,
  closing,
  closed
}

//need to verify that this still works in preview mode
function Header({ isPreview } : HeaderProps) {
  const [hamburgerMenuState, setHamburgerMenuState] = useState<HamburgerMenuState>(HamburgerMenuState.closed);
  const openHamburgerBtn = useRef<HTMLButtonElement>(null);
  const closeHamburgerBtn = useRef<HTMLButtonElement>(null);
  const hamburgerMenu = useRef<HTMLElement>(null);

  const openHamburger = () => {
    setHamburgerMenuState(HamburgerMenuState.opening);
    hamburgerMenu.current?.addEventListener("animationend", () => {
      setHamburgerMenuState(HamburgerMenuState.open);
      closeHamburgerBtn.current?.focus({});
    }, {once: true});
  }
  const closeHamburger = () => {
    setHamburgerMenuState(HamburgerMenuState.closing);
    hamburgerMenu.current?.addEventListener("animationend", () => {
      setHamburgerMenuState(HamburgerMenuState.closed);
      openHamburgerBtn.current?.focus();
    }, {once: true});
  };
  
  return (
    <IconContext.Provider value={{ color: "white" }}>
      <header className={isPreview ? styles.header_preview : styles.header}>
        <div className={styles.header_content}>
          <Link href={isPreview ? "#" : "/"} className={styles.brand_link}>
            <Image src={logo} alt="8by8 logo" className={styles.brand_logo} />
          </Link>
          <div className={hamburgerMenuState !== HamburgerMenuState.open ? styles.icons_tray : styles.hidden}>
            <button
              onClick={() =>
                !isPreview &&
                window.open("https://forms.gle/r33L2NAKT69MrvsZ7", "_blank")
              }
              className={styles.feedback_btn}
              aria-label="open feedback form"
            >
              <Image src={feedback} alt="feedback icon" className={styles.feedback_btn_icon}/>
            </button>
            <button 
              className={styles.hamburger_btn} 
              onClick={openHamburger}
              aria-label="open navigation menu"
              ref={openHamburgerBtn}
            >
              <FaBars />
            </button>
        </div>
        </div>
      </header>
      {
        <div 
          className={
            hamburgerMenuState !== HamburgerMenuState.closed ? 
              styles.hamburger_menu_outer_container :
              styles.hidden
            }
          >
          <div className={styles.hamburger_menu_inner_container}>
            <nav 
              className={
                hamburgerMenuState === HamburgerMenuState.open || 
                hamburgerMenuState === HamburgerMenuState.opening ? 
                  styles.hamburger_menu_open : styles.hamburger_menu_closing
              }
              ref={hamburgerMenu}
            >
              <ul className={styles.hamburger_menu_items}>
                <li>
                <button 
                  ref={closeHamburgerBtn} 
                  onClick={closeHamburger} 
                  aria-label="close navigation menu"
                  className={styles.close_hamburger_btn}
                >
                   <IoIosArrowForward/>
                </button>
                </li>
                <Greeting />
                <HamburgerLinks hideMenu={closeHamburger} />
              </ul>
            </nav>
          </div>
        </div>
      }
    </IconContext.Provider>
  );
}

export default Header;