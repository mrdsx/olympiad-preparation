from fastapi import APIRouter

from features.word_game import router as word_game_router
from .root import router as root_router

api_router = APIRouter()
api_router.include_router(root_router)
api_router.include_router(word_game_router)

__all__ = ["api_router"]
