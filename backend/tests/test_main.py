import pytest
from fastapi import status
from fastapi.testclient import TestClient

from app.shared import ResponseStatus


@pytest.mark.asyncio
async def test_read_root_success(test_client: TestClient):
    response = test_client.get("/")
    data = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert data["title"] == "Olympiad preparation backend"
    assert data["status"] == ResponseStatus.OK
    assert data["project_environment"] == "development"
    assert isinstance(data["datetime"], str)
