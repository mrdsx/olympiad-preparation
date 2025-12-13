import pytest
from collections.abc import Generator
from fastapi.testclient import TestClient

from src.main import app


@pytest.fixture(scope="package")
def test_client() -> Generator[TestClient]:
    client = TestClient(app)
    yield client
