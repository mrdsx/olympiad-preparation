"use client";

import { path } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { NavBarLink } from "./NavBarLink";

function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 p-2">
      <NavBarLink href={path.ROOT} pathname={pathname}>
        Главная
      </NavBarLink>
      <NavBarLink href={path.WORD_GAME} pathname={pathname}>
        Слово
      </NavBarLink>
      <NavBarLink href={path.MATCHES} pathname={pathname}>
        Соответствия
      </NavBarLink>
    </nav>
  );
}

export { NavBar };
