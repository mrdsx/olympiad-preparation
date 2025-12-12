import { Link } from "react-router";

import { Button } from "@/components/ui/button";

const MATH_PROBLEMS_GENERATOR_URL = "https://ra-zor.ru/gen";

function ExpressionsPage() {
  return (
    <div>
      <Button className="font-normal" variant="link">
        <Link to={MATH_PROBLEMS_GENERATOR_URL}>Генератор примеров</Link>
      </Button>
    </div>
  );
}

export { ExpressionsPage };
