import { Button } from "@/components/ui/button";
import { handleExportToPDF, handleExportToPNG } from "@/features/matches";
import type { ReactRef } from "@/lib/types";

type ExportActionsProps = {
  matchesGridRef: ReactRef<HTMLDivElement>;
};

function ExportActions({ matchesGridRef }: ExportActionsProps) {
  return (
    <div className="flex justify-center gap-2">
      <Button
        variant="outline"
        onClick={() => {
          if (matchesGridRef.current === null) return;
          handleExportToPNG(matchesGridRef.current);
        }}
      >
        Экспорт в PNG
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          if (matchesGridRef.current === null) return;
          handleExportToPDF(matchesGridRef.current);
        }}
      >
        Экспорт в PDF
      </Button>
    </div>
  );
}

export { ExportActions };
