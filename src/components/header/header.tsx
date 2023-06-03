import Link from "next/link";
import Image from "next/image";
import { IconContext } from "react-icons";
import { HeaderContextProvider } from "./header-context";
import logo from "../../../public/assets/logos/white-logo.svg";
import styles from "../../styles/modules/components/header/header.module.scss";
import IconsTray from "./icons-tray/icons-tray";
import HamburgerMenu from "./hamburger-menu/hamburger-menu";

export default function Header() {
  return (
    <HeaderContextProvider>
      <IconContext.Provider value={{ color: "white" }}>
        <header className={styles.header}>
          <div className={styles.header_content}>
            <Link href={"/"} className={styles.brand_link}>
              <Image src={logo} alt="8by8 logo" className={styles.brand_logo} />
            </Link>
            <IconsTray />
          </div>
        </header>
        <HamburgerMenu />
      </IconContext.Provider>
    </HeaderContextProvider>
  );
}