import { PropsWithChildren, useContext } from "react";
import Link from "next/link";
import { HeaderContext } from "../../../header-context";

type HamburgerLinkProps = PropsWithChildren & {
  href:string;
  className?:string;
}

export default function HamburgerLink({href, className, children}:HamburgerLinkProps) {
  const {closeHamburgerMenu} = useContext(HeaderContext);
  return (
    <li>
      <Link onClick={closeHamburgerMenu} href={href} className={className}>{children}</Link>
    </li>
  )
}