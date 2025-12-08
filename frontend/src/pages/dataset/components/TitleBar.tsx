import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/typography-h1";
import { PATH } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

type TitleBarProps = {
  title: string;
};

function TitleBar({ title }: TitleBarProps) {
  return (
    <div className="relative flex items-center">
      <Link
        className="absolute right-[40vw] md:right-80 lg:right-100"
        to={PATH.ROOT}
      >
        <Button variant="link">
          <ArrowLeft />
          Назад
        </Button>
      </Link>
      <H1>{title}</H1>
    </div>
  );
}

export { TitleBar };
