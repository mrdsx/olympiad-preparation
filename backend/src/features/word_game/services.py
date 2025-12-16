import random
from cachetools.func import ttl_cache

from core import DEFAULT_CACHE_MAX_SIZE, DEFAULT_TTL
from .constants import MIN_WORD_LENGTH, MIN_ANAGRAMS, MAX_ANAGRAMS
from .types import AnagramsDictionary, AnagramsList, ProhibitedWordsSet, WordsTuple
from .utils import can_build


def generate_anagrams(
    base_word: str,
    anagrams_dictionary: AnagramsDictionary,
    prohibited_words_set: ProhibitedWordsSet,
    words_tuple: WordsTuple,
) -> AnagramsList:
    if base_word in anagrams_dictionary:
        anagrams = anagrams_dictionary[base_word]
    else:
        anagrams = search_anagrams(base_word, words_tuple)
    filtered_anagrams = [a for a in anagrams if a not in prohibited_words_set]

    return filtered_anagrams


def generate_word_with_anagrams(
    anagrams_dictionary: AnagramsDictionary,
    prohibited_words_set: ProhibitedWordsSet,
    words_tuple: WordsTuple,
) -> tuple[str, AnagramsList]:
    base_word = random.choice(list(anagrams_dictionary.keys()))
    anagrams = generate_anagrams(
        base_word, anagrams_dictionary, prohibited_words_set, words_tuple
    )

    if len(anagrams) < MIN_ANAGRAMS or len(anagrams) > MAX_ANAGRAMS:
        return generate_word_with_anagrams(
            anagrams_dictionary, prohibited_words_set, words_tuple
        )
    return (base_word, anagrams)


@ttl_cache(maxsize=DEFAULT_CACHE_MAX_SIZE, ttl=DEFAULT_TTL)
def search_anagrams(base_word: str, words_tuple: WordsTuple) -> AnagramsList:
    return [
        word
        for word in words_tuple
        if can_build(word, base_word)
        and word != base_word
        and len(word) >= MIN_WORD_LENGTH
    ]
