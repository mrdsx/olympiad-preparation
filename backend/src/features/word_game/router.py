from fastapi import APIRouter
from google.genai.errors import ClientError

from features.gemini import ask_word_explanation, WordExplanationResponse
from .constants import MAX_BASE_WORD_LENGTH
from .exceptions import (
    raise_ai_client_error,
    raise_invalid_string_length,
    raise_value_error,
)
from .schemas import AnagramsResponse
from .services import generate_anagrams, generate_word_with_anagrams


router = APIRouter(prefix="/word-game")


@router.get("/", response_model=AnagramsResponse)
async def get_word_with_anagrams() -> AnagramsResponse:
    base_word, anagrams = generate_word_with_anagrams()
    return AnagramsResponse(base_word=base_word, anagrams=anagrams)


@router.get("/anagrams", response_model=AnagramsResponse)
async def get_anagrams(base_word: str) -> AnagramsResponse:
    if len(base_word) > MAX_BASE_WORD_LENGTH or len(base_word) == 0:
        raise_invalid_string_length()

    anagrams = generate_anagrams(base_word)
    return AnagramsResponse(base_word=base_word, anagrams=anagrams)


@router.get("/explain-word", response_model=WordExplanationResponse)
async def get_word_explanation(word: str) -> WordExplanationResponse:
    try:
        processed_word = word.strip().lower()
        explanation = await ask_word_explanation(processed_word)
        return WordExplanationResponse(word=processed_word, explanation=explanation)
    except ValueError as error:
        raise_value_error(error)
    except ClientError as error:
        raise_ai_client_error(error)
