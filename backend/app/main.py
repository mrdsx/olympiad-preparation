import os
import uvicorn
from datetime import datetime
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import ValidationError
from typing import Any

from config import APP_HOST, APP_PORT
from error_handlers import global_error_handler, validation_error_handler
from features.word_game import router as word_game_router
from lifespan import lifespan
from shared import ResponseStatus

app = FastAPI(title="My API", version="1.0", lifespan=lifespan)

origins = [os.getenv("ALLOWED_ORIGIN", "localhost:3000"), "http://localhost:3000"]
project_environment = os.getenv("PROJECT_ENVIRONMENT", "development")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root() -> dict[str, Any]:
    return {
        "title": "Olympiad preparation backend",
        "status": ResponseStatus.OK,
        "project_environment": project_environment,
        "datetime": datetime.now(),
    }


app.include_router(word_game_router)

app.add_exception_handler(status.HTTP_500_INTERNAL_SERVER_ERROR, global_error_handler)
app.add_exception_handler(ValidationError, validation_error_handler)  # type: ignore


if __name__ == "__main__":
    uvicorn.run(
        app="main:app",
        host=APP_HOST,
        port=APP_PORT,
        reload=project_environment == "development",
    )
