type BaseAPIErrorResponse = {
  detail: {
    status: string;
    message: string;
    error_type: string;
  };
};

type Path = `/${string}`;

type ReactRef<T> = React.RefObject<T | null>;
type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type { BaseAPIErrorResponse, Path, ReactRef, ReactSetState };
