import pytest
from collections.abc import Generator
from unittest.mock import AsyncMock, patch


@pytest.fixture(scope="package")
def mock_generate_content() -> Generator[AsyncMock]:
    with patch(
        "src.features.gemini.services.client.models.generate_content",
        new_callable=AsyncMock,
    ) as mock:
        yield mock


@pytest.fixture(scope="package")
def word_to_explain() -> str:
    return "квант"


@pytest.fixture(scope="package")
def word_explanation() -> str:
    return "Квант — минимальная неделимая часть какой-либо физической величины"
