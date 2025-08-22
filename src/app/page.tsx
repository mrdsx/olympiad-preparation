import { Countdown } from "@/features/countdown";
import { SelectGridSize } from "@/features/grid";
import { TrainingArea } from "@/features/training";
import Link from "next/link";

function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center gap-3">
      <header className="relative flex w-full justify-center">
        <Countdown className="absolute text-xl left-5 top-[50%] -translate-y-[50%]" />
        <nav className="p-2">
          <Link
            href="/"
            className="hover:bg-accent size-fit cursor-pointer rounded-t-lg border-b-1 p-1"
          >
            Соответствия
          </Link>
        </nav>
      </header>
      <main className="flex flex-col items-center gap-3">
        <SelectGridSize />
        <TrainingArea />
      </main>
    </div>
  );
}

export default Home;
