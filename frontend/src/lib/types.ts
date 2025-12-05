type Path = `/${string}`;

type BaseAPIErrorResponse = {
  detail: {
    status: string;
    message: string;
    error_type: string;
  };
};

export type { BaseAPIErrorResponse, Path };
