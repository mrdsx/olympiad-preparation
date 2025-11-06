import gzip, json, pickle, random
from collections import Counter

ANAGRAMS_DICTIONARY_PATH = "app/features/word_game/anagrams.json.gz"
WORDS_PATH = "app/features/word_game/nouns.pkl"
MIN_ANAGRAMS = 10
MAX_ANAGRAMS = 30
MIN_WORD_LENGTH = 4

words: list[str] = pickle.load(open(WORDS_PATH, "rb"))

with gzip.open(ANAGRAMS_DICTIONARY_PATH, "rt", encoding="utf-8") as file:
    anagrams_dictionary: dict[str, list[str]] = json.load(file)


def can_build(word: str, letters: str):
    return not (Counter(word) - Counter(letters))


def generate_anagrams(base_word: str) -> list[str]:
    if base_word in anagrams_dictionary:
        return anagrams_dictionary[base_word]
    return [
        word
        for word in words
        if can_build(word, base_word)
        and word != base_word
        and len(word) >= MIN_WORD_LENGTH
    ]


def generate_word_with_anagrams() -> tuple[str, list[str]]:
    random_index = random.randint(0, len(anagrams_dictionary.keys()) - 1)
    base_word = list(anagrams_dictionary.keys())[random_index]
    anagrams: list[str] = generate_anagrams(base_word)

    if len(anagrams) < MIN_ANAGRAMS or len(anagrams) > MAX_ANAGRAMS:
        return generate_word_with_anagrams()
    return (base_word, anagrams)
