import { isBaseAPIErrorResponse } from "./utils";

async function apiFetch<TResponse extends Record<string, any>>(
  path: string,
  init?: RequestInit,
): Promise<TResponse> {
  const response = await fetch(path, { ...init });
  const data = await response.json();

  if (response.ok) return data;
  if (isBaseAPIErrorResponse(data)) console.warn(data.detail);

  throw new Error(data.detail ?? "Unexpected error occurred.");
}

export { apiFetch };
