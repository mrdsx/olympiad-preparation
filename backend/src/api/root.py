from datetime import datetime
from fastapi import APIRouter
from typing import Any

from core import PROJECT_ENV, PROJECT_VERSION
from shared import ResponseStatus

router = APIRouter()


@router.get("/")
async def read_root() -> dict[str, Any]:
    return {
        "title": "Olympiad preparation backend",
        "status": ResponseStatus.OK,
        "project_environment": PROJECT_ENV,
        "datetime": datetime.now(),
        "version": PROJECT_VERSION,
    }
