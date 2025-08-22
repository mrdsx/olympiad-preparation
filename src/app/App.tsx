import { ToggleThemeBtn } from "@/features/theme";

export function App() {
  return (
    <div className="relative flex h-screen flex-col items-center px-[10vw]">
      <nav className="p-2">
        <ul>
          <li className="size-fit rounded-t-lg border-b-1 p-1 hover:bg-neutral-100">
            <a href="#">Соответствия</a>
          </li>
        </ul>
      </nav>
      <div>
        <div className="grid grid-cols-4 grid-rows-4">
          <div className="size-40 border-1"></div>
        </div>
      </div>
      <ToggleThemeBtn className="asd" />
    </div>
  );
}
