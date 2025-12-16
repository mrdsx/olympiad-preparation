from fastapi import Request, status
from fastapi.responses import JSONResponse
from pydantic import ValidationError

from shared import ResponseStatus


async def global_error_handler(
    request: Request,
    exception: Exception,
) -> JSONResponse:
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "status": ResponseStatus.ERROR,
            "message": f"Error at URL {request.url}",
            "error_message": str(exception),
        },
    )


async def validation_error_handler(
    request: Request,
    exception: ValidationError,
) -> JSONResponse:
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
        content={
            "status": ResponseStatus.ERROR,
            "message": f"Validation error at URL {request.url}",
            "error_message": exception.errors(),
        },
    )
