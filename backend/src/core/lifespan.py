from contextlib import asynccontextmanager
from fastapi import FastAPI

from features.gemini import ask_word_explanation


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    yield
    # Shutdown
    await ask_word_explanation.cache_close()
