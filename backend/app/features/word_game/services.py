import random
from cachetools.func import ttl_cache

from config import DEFAULT_CACHE_MAX_SIZE, DEFAULT_TTL
from .constants import MIN_WORD_LENGTH, MIN_ANAGRAMS, MAX_ANAGRAMS
from .data_loaders import anagrams_dictionary, words_list
from .utils import can_build


@ttl_cache(maxsize=DEFAULT_CACHE_MAX_SIZE, ttl=DEFAULT_TTL)
def search_anagrams(base_word: str) -> list[str]:
    return [
        word
        for word in words_list
        if can_build(word, base_word)
        and word != base_word
        and len(word) >= MIN_WORD_LENGTH
    ]


def generate_anagrams(base_word: str) -> list[str]:
    if base_word in anagrams_dictionary:
        return anagrams_dictionary[base_word]

    return search_anagrams(base_word)


def generate_word_with_anagrams() -> tuple[str, list[str]]:
    random_index = random.randint(0, len(anagrams_dictionary.keys()) - 1)
    base_word = list(anagrams_dictionary.keys())[random_index]
    anagrams: list[str] = generate_anagrams(base_word)

    if len(anagrams) < MIN_ANAGRAMS or len(anagrams) > MAX_ANAGRAMS:
        return generate_word_with_anagrams()
    return (base_word, anagrams)
