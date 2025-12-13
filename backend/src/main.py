from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware

from pydantic import ValidationError

from api import api_router
from core.constants import ALLOWED_ORIGINS, PROJECT_VERSION
from core.error_handlers import global_error_handler, validation_error_handler
from core.lifespan import lifespan

def get_app() -> FastAPI:
    _app = FastAPI(title="My API", version=PROJECT_VERSION, lifespan=lifespan)

    _app.add_middleware(
        CORSMiddleware,
        allow_origins=ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    _app.include_router(api_router)

    _app.add_exception_handler(ValidationError, validation_error_handler)  # type: ignore
    _app.add_exception_handler(status.HTTP_500_INTERNAL_SERVER_ERROR, global_error_handler)

    return _app

app = get_app()