import rebusesData from "./data/rebuses.json";
import type { RebusItem } from "./types";

function getRebusesArray(): RebusItem[] {
  return structuredClone(rebusesData);
}

export { getRebusesArray };
