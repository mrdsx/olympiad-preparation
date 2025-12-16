import gzip
import json
from functools import lru_cache

from .constants import PROHIBITED_WORDS_PATH, WORDS_PATH, ANAGRAMS_DICTIONARY_PATH
from .types import AnagramsDictionary, ProhibitedWordsSet, WordsTuple


@lru_cache
def get_anagrams_dictionary() -> AnagramsDictionary:
    return json.load(gzip.open(ANAGRAMS_DICTIONARY_PATH, "rt", encoding="utf-8"))


@lru_cache
def get_prohibited_words_set() -> ProhibitedWordsSet:
    prohibited_words_list: list[str] = json.load(
        open(PROHIBITED_WORDS_PATH, "r", encoding="utf-8")
    )
    return set(prohibited_words_list)


@lru_cache
def get_words_tuple() -> WordsTuple:
    words_list: list[str] = json.load(gzip.open(WORDS_PATH, "rt", encoding="utf-8"))
    return tuple(words_list)
