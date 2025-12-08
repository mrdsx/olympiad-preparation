import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { H1 } from "@/components/ui/typography-h1";
import { getImagesById } from "@/features/grid";
import { declineWord } from "@/lib/utils";
import { DATASET_LINKS } from "@/pages/dataset/dataset-links";
import { Link } from "react-router";

const WORDS_LIST = ["изображение", "изображения", "изображений"];

function HomePage() {
  return (
    <>
      <H1>Соответствия</H1>
      <div className="xs:grid-cols-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {Object.entries(DATASET_LINKS).map(([url, data]) => {
          const imagesLength = getImagesById(data.id)?.images.length ?? 0;
          const declinedWord = declineWord(imagesLength, WORDS_LIST);

          return (
            <Link to={url} key={data.id}>
              <Card className="hover:bg-secondary w-50 transition-all sm:text-start">
                <CardHeader>
                  <CardTitle>{data.title}</CardTitle>
                  <CardDescription>
                    {imagesLength} {declinedWord}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export { HomePage };
