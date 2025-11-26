import pytest
from collections.abc import Generator
from fastapi.testclient import TestClient

from src.features.gemini import ask_word_explanation
from src.app import app


@pytest.fixture(scope="package")
def test_client() -> Generator[TestClient]:
    client = TestClient(app)
    yield client
    ask_word_explanation.cache_clear()
