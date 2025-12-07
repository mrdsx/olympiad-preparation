type BaseAPIErrorResponse = {
  detail: {
    status: string;
    message: string;
    error_type: string;
  };
};

type Path = `/${string}`;

export type { BaseAPIErrorResponse, Path };
