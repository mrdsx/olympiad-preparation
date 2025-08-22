"use client";

import { Button } from "@/components/ui/button";
import { useTrainingStore } from "@/features/training";
import Image from "next/image";
import { useGridLayoutStore, useImagesStore } from "../stores";

const GRID_CELL_WIDTH = "160px";
const GRID_CELL_HEIGHT = "100px";

function MatchesGrid({ showAnswers }: { showAnswers?: boolean }) {
  const { gridLayout } = useGridLayoutStore();
  const { images } = useImagesStore();
  const { reset: resetTraining } = useTrainingStore();

  return (
    <>
      {showAnswers && (
        <Button onClick={resetTraining}>Сгенерировать заново</Button>
      )}
      <div
        className="mb-3 grid border-1"
        style={{
          gridTemplateColumns: `repeat(${gridLayout.columns}, minmax(0, ${GRID_CELL_WIDTH}))`,
          gridTemplateRows: `repeat(${gridLayout.rows}, minmax(0, ${GRID_CELL_HEIGHT}))`,
        }}
      >
        {images.map((image) => (
          <div
            className="relative grid place-content-center overflow-hidden border-1 text-center grayscale-100"
            key={image.name}
          >
            {showAnswers ? (
              <span>{image.name}</span>
            ) : (
              <Image
                src={image.url}
                alt={image.name}
                className="object-contain"
                fill
                sizes={`${GRID_CELL_WIDTH}`}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export { MatchesGrid };
