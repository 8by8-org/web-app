import { useContext } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { HeaderContext } from '../header-context';
import { HamburgerMenuState } from '../header-context';
import Greeting from './greeting';
import Links from './links/links';
import styles from '@/styles/modules/components/header/hamburger-menu/hamburger-menu.module.scss';


export default function HamburgerMenu() {
    const {hamburgerMenuState, hamburgerMenuRef, closeHamburgerMenuBtnRef, closeHamburgerMenu} = useContext(HeaderContext);

    return (
      <div 
        className={
          hamburgerMenuState !== HamburgerMenuState.closed ? 
            styles.hamburger_menu_outer_container :
            "hidden"
          }
        >
        <div className={styles.hamburger_menu_inner_container}>
          <nav 
            className={
              hamburgerMenuState === HamburgerMenuState.open || 
              hamburgerMenuState === HamburgerMenuState.opening ? 
                styles.hamburger_menu_open : styles.hamburger_menu_closing
            }
            ref={hamburgerMenuRef}
          >
            <ul className={styles.hamburger_menu_items}>
              <li>
                <button 
                  ref={closeHamburgerMenuBtnRef} 
                  onClick={closeHamburgerMenu} 
                  aria-label="close navigation menu"
                  className={styles.close_hamburger_btn}
                >
                  <IoIosArrowForward/>
                </button>
              </li>
              <Greeting />
              <Links />
            </ul>
          </nav>
        </div>
      </div>
    )
  }