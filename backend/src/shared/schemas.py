from pydantic import BaseModel

from .enums import ResponseStatus


class ErrorResponse(BaseModel):
    status: ResponseStatus
    message: str
    error_type: str
