import type { Metadata } from "next";
import "./app.css";
import "./globals.css";

const metadata: Metadata = {
  title: "Соответствия",
  description:
    'Приложение для тренировки задания "Соответствия" из олимпиады "Наше Наследие"',
};

function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export { metadata };
export default RootLayout;
