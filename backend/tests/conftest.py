import pytest
from collections.abc import Generator
from fastapi.testclient import TestClient
from unittest.mock import AsyncMock, patch

from app.features.gemini import ask_word_explanation
from app.main import app


@pytest.fixture(scope="module")
def mock_generate_content() -> Generator[AsyncMock]:
    with patch(
        "app.features.gemini.services.client.models.generate_content",
        new_callable=AsyncMock,
    ) as mock:
        yield mock


@pytest.fixture(scope="module")
def test_client() -> Generator[TestClient]:
    client = TestClient(app)
    yield client
    ask_word_explanation.cache_clear()


@pytest.fixture(scope="module")
def word_to_explain() -> str:
    return "квант"


@pytest.fixture(scope="module")
def word_explanation() -> str:
    return "Квант — минимальная неделимая часть какой-либо физической величины"
