import { PATH } from "@/lib/constants";
import { NavBarLink } from "./NavBarLink";

function NavBar() {
  return (
    <nav className="flex gap-2 p-2">
      <NavBarLink href={PATH.ROOT}>Главная</NavBarLink>
      <NavBarLink href={PATH.EXPRESSIONS}>Примеры</NavBarLink>
      <NavBarLink href={PATH.WORD_GAME}>Слово</NavBarLink>
      <NavBarLink href={PATH.MATCHES}>Соответствия</NavBarLink>
    </nav>
  );
}

export { NavBar };
