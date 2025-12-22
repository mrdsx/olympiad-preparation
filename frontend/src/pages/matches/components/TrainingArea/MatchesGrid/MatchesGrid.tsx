import {
  REBUS_CATEGORY,
  useGridSizeStore,
  useImagesStore,
} from "@/features/matches";
import { getCDNImageURL } from "@/lib/cdn";
import { MAX_IMAGE_WIDTH } from "@/lib/constants";
import { cn } from "@/lib/utils";

const GRID_CELL_WIDTH = `${MAX_IMAGE_WIDTH}px`;
const GRID_CELL_HEIGHT = "100px";

type MatchesGridProps = {
  matchesGridRef: React.RefObject<HTMLDivElement | null>;
  showAnswers?: boolean;
  showImages?: boolean;
};

function MatchesGrid({
  matchesGridRef,
  showAnswers,
  showImages,
}: MatchesGridProps) {
  const gridSize = useGridSizeStore((state) => state.gridSize);
  const applyGrayscale = useImagesStore((state) => state.applyGrayscale);
  const images = useImagesStore((state) => state.images);

  return (
    <>
      <div
        className="grid border"
        style={{
          gridTemplateColumns: `repeat(${gridSize.columns}, minmax(0, ${GRID_CELL_WIDTH}))`,
          gridTemplateRows: `repeat(${gridSize.rows}, minmax(0, ${GRID_CELL_HEIGHT}))`,
        }}
        ref={matchesGridRef}
      >
        {images.map((image) => (
          <div
            className={cn(
              "relative flex items-center justify-center overflow-hidden border text-center",
              image.category === REBUS_CATEGORY || applyGrayscale
                ? "grayscale-100"
                : "",
            )}
            key={image.name}
          >
            {!showImages && showAnswers ? (
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
