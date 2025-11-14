import { Button } from "@/components/ui/button";
import Link from "next/link";

const MATH_PROBLEMS_GENERATOR_URL = "https://ra-zor.ru/gen";

function ExpressionsPage() {
  return (
    <div>
      <Button className="font-normal" variant="link">
        <Link href={MATH_PROBLEMS_GENERATOR_URL}>Генератор примеров</Link>
      </Button>
    </div>
  );
}

export default ExpressionsPage;
