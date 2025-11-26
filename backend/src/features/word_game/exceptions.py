from fastapi import HTTPException, status
from google.genai.errors import ClientError
from typing import NoReturn

from shared import ErrorResponse, ErrorType, ResponseStatus


def raise_ai_client_error(error: ClientError) -> NoReturn:
    raise HTTPException(
        status_code=error.code,
        detail=ErrorResponse(
            status=ResponseStatus.ERROR,
            message=str(error.message),
            error_type=ErrorType.AI_CLIENT_ERROR,
        ).model_dump(),
    )


def raise_invalid_string_length() -> NoReturn:
    raise HTTPException(
        status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
        detail=ErrorResponse(
            status=ResponseStatus.ERROR,
            message="Invalid string length",
            error_type=ErrorType.VALIDATION_ERROR,
        ).model_dump(),
    )


def raise_value_error(error: ValueError) -> NoReturn:
    raise HTTPException(
        status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
        detail=ErrorResponse(
            status=ResponseStatus.ERROR,
            message=str(error),
            error_type=ErrorType.VALIDATION_ERROR,
        ).model_dump(),
    )
