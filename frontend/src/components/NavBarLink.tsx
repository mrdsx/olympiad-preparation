"use client";

import { cn } from "@/lib/utils";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINK_CLASSNAME = "border-b-1 hover:border-b-black";
const ACTIVE_LINK_CLASSNAME = "border-b-black";
const NOT_ACTIVE_LINK_CLASSNAME = "border-b-transparent";

type NavBarLinkProps = {
  href: Url;
} & React.PropsWithChildren;

function NavBarLink({ children, href }: NavBarLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        LINK_CLASSNAME,
        pathname === href ? ACTIVE_LINK_CLASSNAME : NOT_ACTIVE_LINK_CLASSNAME,
      )}
    >
      {children}
    </Link>
  );
}

export { NavBarLink };
