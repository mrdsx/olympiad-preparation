import pytest
from fastapi import HTTPException, status
from google.genai.errors import ClientError

from app.features.word_game.exceptions import (
    raise_ai_client_error,
    raise_invalid_string_length,
    raise_value_error,
)
from app.shared import ErrorType, ResponseStatus


@pytest.fixture
def client_error():
    error = ClientError(code=status.HTTP_400_BAD_REQUEST, response_json={})
    error.message = "client error occurred"
    return error


@pytest.fixture
def value_error():
    error = ValueError("Value error")
    return error


def test_raise_ai_client_error_raises_error(client_error: ClientError):
    with pytest.raises(HTTPException) as error:
        raise_ai_client_error(client_error)

    assert error.value.status_code == client_error.code
    assert error.value.detail == {
        "status": ResponseStatus.ERROR,
        "message": client_error.message,
        "error_type": ErrorType.AI_CLIENT_ERROR,
    }


def test_raise_invalid_string_error_raises_error():
    with pytest.raises(HTTPException) as error:
        raise_invalid_string_length()

    assert error.value.status_code == status.HTTP_422_UNPROCESSABLE_CONTENT
    assert error.value.detail == {
        "status": ResponseStatus.ERROR,
        "message": "Invalid string length",
        "error_type": ErrorType.VALIDATION_ERROR,
    }


def test_raise_value_error_raises_error(value_error: ValueError):
    with pytest.raises(HTTPException) as error:
        raise_value_error(value_error)

    assert error.value.status_code == status.HTTP_422_UNPROCESSABLE_CONTENT
    assert error.value.detail == {
        "status": ResponseStatus.ERROR,
        "message": str(value_error),
        "error_type": ErrorType.VALIDATION_ERROR,
    }
