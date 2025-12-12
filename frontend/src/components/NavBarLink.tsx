import { Link, useLocation } from "react-router";

import type { Path } from "@/lib/types";
import { cn } from "@/lib/utils";

const LINK_CLASSNAME = "border-b-1 hover:border-b-black";
const ACTIVE_LINK_CLASSNAME = "border-b-black";
const NOT_ACTIVE_LINK_CLASSNAME = "border-b-transparent";

type NavBarLinkProps = {
  href: Path;
} & React.PropsWithChildren;

function NavBarLink({ children, href }: NavBarLinkProps) {
  const { pathname } = useLocation();

  return (
    <Link
      to={href}
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
