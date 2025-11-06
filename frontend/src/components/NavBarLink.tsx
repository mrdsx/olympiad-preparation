import { cn } from "@/lib/utils";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

const LINK_CLASSNAME = "border-b-1 hover:border-b-black";
const ACTIVE_LINK_CLASSNAME = "border-b-black";
const NOT_ACTIVE_LINK_CLASSNAME = "border-b-transparent";

type NavBarLinkProps = {
  href: Url;
  pathname: string;
} & React.PropsWithChildren;

function NavBarLink({ children, href, pathname }: NavBarLinkProps) {
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
