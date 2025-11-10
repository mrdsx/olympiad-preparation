import { HTTP_TOO_MANY_REQUESTS } from "./constants";
import { isBaseAPIErrorResponse } from "./utils";

async function apiFetch(
  path: string,
  init?: RequestInit,
  errorMessage?: string,
): Promise<any> {
  const response = await fetch(path, { ...init });
  const data = await response.json();

  if (response.ok) return data;
  if (isBaseAPIErrorResponse(data)) console.warn(data.detail.message);

  if (response.status === HTTP_TOO_MANY_REQUESTS) {
    throw new Error("Слишком много запросов");
  }
  throw new Error(errorMessage ?? "Произошла ошибка.");
}

export { apiFetch };
