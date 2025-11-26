import gzip, json

from .constants import WORDS_PATH, ANAGRAMS_DICTIONARY_PATH

words_list: list[str] = json.load(gzip.open(WORDS_PATH, "rt", encoding="utf-8"))
anagrams_dictionary: dict[str, list[str]] = json.load(
    gzip.open(ANAGRAMS_DICTIONARY_PATH, "rt", encoding="utf-8")
)
