import { BACKEND_URL, HTTP_TOO_MANY_REQUESTS } from "./constants";
import { type Path } from "./types";
import { isBaseAPIErrorResponse } from "./utils";

async function apiFetch<T = unknown>(
  path: Path,
  init?: RequestInit,
  errorMessage?: string,
): Promise<T> {
  const response = await fetch(`${BACKEND_URL}${path}`, { ...init });
  const data = await response.json();

  if (response.ok) return data;
  if (isBaseAPIErrorResponse(data)) console.warn(data.detail.message);

  if (response.status === HTTP_TOO_MANY_REQUESTS) {
    throw new Error("Слишком много запросов");
  }
  throw new Error(errorMessage ?? "Произошла ошибка.");
}

export { apiFetch };
