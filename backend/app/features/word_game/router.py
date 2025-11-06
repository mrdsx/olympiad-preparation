from fastapi import APIRouter, HTTPException, status

from .schemas import AnagramsResponse, WordGameResponse
from .utils import generate_anagrams, generate_word_with_anagrams


router = APIRouter(prefix="/word-game")


@router.get("/", response_model=WordGameResponse)
async def get_word_with_anagrams() -> WordGameResponse:
    base_word, anagrams = generate_word_with_anagrams()
    return WordGameResponse(base_word=base_word, anagrams=anagrams)


@router.get("/anagrams", response_model=AnagramsResponse)
async def get_anagrams(base_word: str) -> AnagramsResponse:
    if len(base_word) > 20 or len(base_word) == 0:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            detail="Invalid word length",
        )

    anagrams = generate_anagrams(base_word)
    return AnagramsResponse(anagrams=anagrams)
