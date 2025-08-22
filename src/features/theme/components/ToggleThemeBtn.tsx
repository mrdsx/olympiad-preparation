import { Button, buttonVariants } from "@/components/ui";
import { useThemeStore } from "@/features/theme";
import { type VariantProps } from "class-variance-authority";
import { Moon, Sun } from "lucide-react";

type ToggleThemeBtnProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function ToggleThemeBtn({ size }: ToggleThemeBtnProps) {
  const { isDarkMode, setIsDarkMode } = useThemeStore();

  function handleClick() {
    document.body.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
  }

  return (
    <Button variant="outline" onClick={handleClick} size={size}>
      {isDarkMode ? <Sun /> : <Moon />}
    </Button>
  );
}
