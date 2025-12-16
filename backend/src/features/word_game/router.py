from fastapi import APIRouter, Depends
from google.genai.errors import ClientError

from src.features.gemini import ask_word_explanation, WordExplanationResponse
from src.features.word_game import (
    get_anagrams_dictionary,
    get_prohibited_words_set,
    get_words_tuple,
)
from .constants import MAX_BASE_WORD_LENGTH
from .exceptions import (
    raise_ai_client_error,
    raise_invalid_string_length,
    raise_value_error,
)
from .schemas import AnagramsResponse
from .services import generate_anagrams, generate_word_with_anagrams
from .types import AnagramsDictionary, ProhibitedWordsSet, WordsTuple


router = APIRouter(prefix="/word-game")


@router.get("/", response_model=AnagramsResponse)
async def get_word_with_anagrams(
    anagrams_dictionary: AnagramsDictionary = Depends(get_anagrams_dictionary),
    prohibited_words_set: ProhibitedWordsSet = Depends(get_prohibited_words_set),
    words_tuple: WordsTuple = Depends(get_words_tuple),
) -> AnagramsResponse:
    base_word, anagrams = generate_word_with_anagrams(
        anagrams_dictionary, prohibited_words_set, words_tuple
    )
    return AnagramsResponse(base_word=base_word, anagrams=anagrams)


@router.get("/anagrams", response_model=AnagramsResponse)
async def get_anagrams(
    base_word: str,
    anagrams_dictionary: AnagramsDictionary = Depends(get_anagrams_dictionary),
    prohibited_words_set: ProhibitedWordsSet = Depends(get_prohibited_words_set),
    words_tuple: WordsTuple = Depends(get_words_tuple),
) -> AnagramsResponse:
    if len(base_word) > MAX_BASE_WORD_LENGTH or len(base_word) == 0:
        raise_invalid_string_length()

    processed_word = base_word.strip().lower()
    anagrams = generate_anagrams(
        base_word, anagrams_dictionary, prohibited_words_set, words_tuple
    )
    return AnagramsResponse(base_word=processed_word, anagrams=anagrams)


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
