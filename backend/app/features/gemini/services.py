from async_lru import alru_cache

from config import DEFAULT_CACHE_MAX_SIZE, DEFAULT_TTL
from .constants import AI_MODEL_CONFIG, AI_MODEL_NAME
from .gemini_client import client


@alru_cache(maxsize=DEFAULT_CACHE_MAX_SIZE, ttl=DEFAULT_TTL)
async def ask_word_explanation(word: str) -> str:
    if len(word) == 0:
        raise ValueError("Invalid word length")

    response = await client.models.generate_content(  # type: ignore
        model=AI_MODEL_NAME,
        config=AI_MODEL_CONFIG,
        contents=f"Объясни понятие '{word}'",
    )

    return response.text or "-"
