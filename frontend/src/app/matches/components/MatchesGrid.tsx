"use client";

import { Button } from "@/components/ui/button";
import { useGridLayoutStore, useImagesStore } from "@/features/grid";
import { useTrainingStore } from "@/features/training";
import { getCloudinaryUrl } from "@/lib/cdn";
import { MAX_IMAGE_WIDTH } from "@/lib/constants";

const GRID_CELL_WIDTH = `${MAX_IMAGE_WIDTH}px`;
const GRID_CELL_HEIGHT = "100px";

function MatchesGrid({ showAnswers }: { showAnswers?: boolean }) {
  const gridLayout = useGridLayoutStore((state) => state.gridLayout);
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
          gridTemplateColumns: `repeat(${gridLayout.columns}, minmax(0, ${GRID_CELL_WIDTH}))`,
          gridTemplateRows: `repeat(${gridLayout.rows}, minmax(0, ${GRID_CELL_HEIGHT}))`,
        }}
      >
        {images.map((image) => (
          <div
            className="relative flex items-center justify-center border text-center grayscale-100"
            key={image.name}
          >
            {showAnswers ? (
              <span>{image.name}</span>
            ) : (
              <img
                src={getCloudinaryUrl(image.publicId, MAX_IMAGE_WIDTH)}
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
