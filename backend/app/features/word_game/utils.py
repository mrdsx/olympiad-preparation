from collections import Counter


def can_build(word: str, base_word: str):
    return not (Counter(word) - Counter(base_word))
