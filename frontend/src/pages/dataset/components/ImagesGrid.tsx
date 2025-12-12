import { getImagesById, processImages } from "@/features/matches";
import { getCDNImageURL } from "@/lib/cdn";
import { MAX_IMAGE_WIDTH } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ImagesGridProps = {
  imagesId: string;
};

const GRID_CELL_WIDTH = "200px";
const GRID_CELL_HEIGHT = "120px";

function ImagesGrid({ imagesId }: ImagesGridProps) {
  const imagesEntry = getImagesById(imagesId);
  if (imagesEntry === null) return;

  const images = processImages(imagesEntry);

  return (
    <div
      className={cn(
        "mb-3 grid border",
        imagesEntry.gridFlow === "column" ? "grid-flow-col" : "",
      )}
      style={{
        gridTemplateColumns: `repeat(${imagesEntry.columns}, minmax(0, ${GRID_CELL_WIDTH}))`,
        gridTemplateRows: `repeat(${imagesEntry.rows}, minmax(0, ${GRID_CELL_HEIGHT}))`,
      }}
    >
      {images.map((image) => (
        <div
          className="relative flex items-center justify-center border pb-5 text-center"
          key={image.name}
        >
          <img
            src={getCDNImageURL(image.publicId, MAX_IMAGE_WIDTH)}
            alt={image.name}
            className={cn(
              "max-h-full max-w-full",
              imagesEntry.applyGrayscale ? "grayscale-100" : "",
            )}
          />
          <p className="absolute right-0 bottom-0 left-0 bg-white text-sm">
            {image.name}
          </p>
        </div>
      ))}
    </div>
  );
}

export { ImagesGrid };
