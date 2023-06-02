import { PropsWithChildren } from "react";
import Link from "next/link";

type HamburgerLinkProps = PropsWithChildren & {
  hideMenu:() => void;
  href:string;
  className?:string;
}

export default function HamburgerLink({hideMenu, href, className, children}:HamburgerLinkProps) {
  return (
    <li>
      <Link onClick={hideMenu} href={href} className={className}>{children}</Link>
    </li>
  )
}