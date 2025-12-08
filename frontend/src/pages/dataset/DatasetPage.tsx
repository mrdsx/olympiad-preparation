import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router";
import { ErrorText } from "../word-game/components";
import { ImagesGrid } from "./components/ImagesGrid";
import { TitleBar } from "./components/TitleBar";
import { DATASET_LINKS } from "./dataset-links";

const FALLBACK_LINK = { id: "no-id", title: "-" };

function DatasetPage() {
  const { id } = useParams<{ id: string }>();

  const link = DATASET_LINKS[`/dataset/${id}`];
  const { id: imagesId, title } = link ?? FALLBACK_LINK;

  return (
    <>
      <TitleBar title={title} />
      <ErrorBoundary
        fallback={<ErrorText message="Ошибка при получении изображений" />}
      >
        <ImagesGrid imagesId={imagesId} />
      </ErrorBoundary>
    </>
  );
}

export { DatasetPage };
