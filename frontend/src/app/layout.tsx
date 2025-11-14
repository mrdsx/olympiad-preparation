import { AppProvider } from "@/components/AppProvider";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import type { Metadata } from "next";
import "./app.css";
import "./globals.css";

const metadata: Metadata = {
  title: "Подготовка к ОВИО",
  description: 'Приложение для подготовки к олимпиаде "ОВИО Наше Наследие"',
  applicationName: "Подготовка к ОВИО Наше Наследие",
  authors: [{ name: "mrdsx", url: "https://github.com/mrdsx" }],
  creator: "mrdsx",
  referrer: "origin",
  generator: "Next.js",
  publisher: "Vercel",
  keywords: [
    "ОВИО",
    "Наше Наследие",
    "олимпиада",
    "подготовка к олимпиаде",
    "тренировка памяти",
    "задания ОВИО",
    "соответствия",
    "запоминание картинок",
    "история России",
    "культура России",
    "онлайн тренировка",
    "викторина",
    "интеллектуальные игры",
    "школьная олимпиада",
    "тренажёр памяти",
    "подготовка школьников",
  ],
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
          <Footer />
        </body>
      </html>
    </AppProvider>
  );
}

export { metadata };
export default RootLayout;
