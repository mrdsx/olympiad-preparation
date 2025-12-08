import { AppProvider } from "@/components/AppProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PATH } from "@/lib/constants";
import {
  DatasetPage,
  ExpressionsPage,
  HomePage,
  MatchesPage,
  WordGamePage,
} from "@/pages";
import { Route, Routes } from "react-router";

function App() {
  return (
    <AppProvider>
      <div className="flex min-h-screen flex-col items-center gap-3">
        <Header />
        <main className="flex flex-col items-center gap-3">
          <Routes>
            <Route index element={<HomePage />} />
            <Route path={PATH.DATASET.SEGMENT} element={<DatasetPage />} />
            <Route path={PATH.EXPRESSIONS} element={<ExpressionsPage />} />
            <Route path={PATH.MATCHES} element={<MatchesPage />} />
            <Route path={PATH.WORD_GAME} element={<WordGamePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
