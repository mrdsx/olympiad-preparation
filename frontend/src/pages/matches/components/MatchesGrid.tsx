import { Button } from "@/components/ui/button";
import {
  useGridSizeStore,
  useImagesStore,
  useTrainingStore,
} from "@/features/matches";
import { getCDNImageURL } from "@/lib/cdn";
import { MAX_IMAGE_WIDTH } from "@/lib/constants";
import { cn } from "@/lib/utils";

const GRID_CELL_WIDTH = `${MAX_IMAGE_WIDTH}px`;
const GRID_CELL_HEIGHT = "100px";

function MatchesGrid({ showAnswers }: { showAnswers?: boolean }) {
  const gridSize = useGridSizeStore((state) => state.gridSize);
  const applyGrayscale = useImagesStore((state) => state.applyGrayscale);
  const images = useImagesStore((state) => state.images);
  const resetTrainingStore = useTrainingStore((state) => state.reset);

  return (
    <>
      {showAnswers && (
        <Button onClick={resetTrainingStore}>Сгенерировать заново</Button>
      )}
      <div
        className="mb-3 grid border"
        style={{
          gridTemplateColumns: `repeat(${gridSize.columns}, minmax(0, ${GRID_CELL_WIDTH}))`,
          gridTemplateRows: `repeat(${gridSize.rows}, minmax(0, ${GRID_CELL_HEIGHT}))`,
        }}
      >
        {images.map((image) => (
          <div
            className={cn(
              "relative flex items-center justify-center border text-center overflow-hidden",
              applyGrayscale ? "grayscale-100" : "",
            )}
            key={image.name}
          >
            {showAnswers ? (
              <span>{image.name}</span>
            ) : (
              <img
                src={getCDNImageURL(image.publicId, MAX_IMAGE_WIDTH)}
                alt={image.name}
                className="max-h-full max-w-full"
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export { MatchesGrid };
