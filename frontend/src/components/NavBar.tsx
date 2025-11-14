import { path } from "@/lib/constants";
import { NavBarLink } from "./NavBarLink";

function NavBar() {
  return (
    <nav className="flex gap-2 p-2">
      <NavBarLink href={path.ROOT}>Главная</NavBarLink>
      <NavBarLink href={path.EXPRESSIONS}>Примеры</NavBarLink>
      <NavBarLink href={path.WORD_GAME}>Слово</NavBarLink>
      <NavBarLink href={path.MATCHES}>Соответствия</NavBarLink>
    </nav>
  );
}

export { NavBar };
