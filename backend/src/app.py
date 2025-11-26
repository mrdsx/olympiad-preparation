from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware

from pydantic import ValidationError

from config import ALLOWED_ORIGINS
from error_handlers import global_error_handler, validation_error_handler
from lifespan import lifespan
from features.word_game import router as word_game_router
from root import router as root_router


app = FastAPI(title="My API", version="1.0", lifespan=lifespan)


app.include_router(root_router)
app.include_router(word_game_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(ValidationError, validation_error_handler)  # type: ignore
app.add_exception_handler(status.HTTP_500_INTERNAL_SERVER_ERROR, global_error_handler)
