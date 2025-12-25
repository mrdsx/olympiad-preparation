import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router";

import { ErrorText } from "@/components/ErrorText";

import { ImagesGrid, TitleBar } from "./components";
import { SwitchShowImagesTitles } from "./components/SwitchShowImagesTitles";
import { DATASET_LINKS } from "./dataset-links";

const FALLBACK_LINK = { id: "no-id", title: "-" };

function DatasetPage() {
  const { id } = useParams<{ id: string }>();

  const link = DATASET_LINKS[`/dataset/${id}`];
  const { id: imagesId, title } = link ?? FALLBACK_LINK;

  return (
    <>
      <TitleBar title={title} />
      <SwitchShowImagesTitles />
      <ErrorBoundary
        fallback={<ErrorText message="Ошибка при загрузке изображений" />}
      >
        <ImagesGrid imagesId={imagesId} />
      </ErrorBoundary>
    </>
  );
}

export { DatasetPage };
