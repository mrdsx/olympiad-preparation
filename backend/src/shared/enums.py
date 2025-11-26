from enum import StrEnum


class ErrorType(StrEnum):
    AI_CLIENT_ERROR = "ai_client_error"
    VALIDATION_ERROR = "validation_error"


class ResponseStatus(StrEnum):
    OK = "ok"
    ERROR = "error"
