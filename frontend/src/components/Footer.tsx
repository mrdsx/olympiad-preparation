import Link from "next/link";
import { Button } from "./ui/button";

function Footer() {
  return (
    <footer className="mt-auto mb-2">
      Об ошибках писать{" "}
      <Button className="px-0" variant="link">
        <Link className="font-semibold" href="mailto:CastleGG@yandex.ru">
          CastleGG@yandex.ru
        </Link>
      </Button>
      <p>© {new Date().getFullYear()}</p>
    </footer>
  );
}

export { Footer };
