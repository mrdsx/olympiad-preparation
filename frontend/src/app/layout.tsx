import { AppProvider } from "@/components/AppProvider";
import { NavBar } from "@/components/NavBar";
import type { Metadata } from "next";
import "./app.css";
import "./globals.css";

const metadata: Metadata = {
  title: "Подготовка к ОВИО",
  description:
    'Приложение для тренировки подготовки к олимпиаде "Наше Наследие"',
};

function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <AppProvider>
      <html lang="en">
        <body className="flex min-h-screen flex-col items-center gap-3">
          <header>
            <NavBar />
          </header>
          <main className="flex flex-col items-center gap-3">{children}</main>
        </body>
      </html>
    </AppProvider>
  );
}

export { metadata };
export default RootLayout;
