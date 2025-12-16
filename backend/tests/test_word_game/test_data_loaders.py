from collections.abc import Callable
from typing import Any

from src.features.word_game import (
    get_anagrams_dictionary,
    get_prohibited_words_set,
    get_words_tuple,
)


def test_anagrams_dictionary(is_valid_pair: Callable[[Any, Any], bool]):
    anagrams_dictionary = get_anagrams_dictionary()

    assert isinstance(anagrams_dictionary, dict)
    assert len(anagrams_dictionary) > 0
    assert all([is_valid_pair(k, v) for k, v in anagrams_dictionary.items()])


def test_get_prohibited_words(is_valid_word: Callable[[Any], bool]):
    prohibited_words = get_prohibited_words_set()

    assert isinstance(prohibited_words, set)
    assert len(prohibited_words) > 0
    assert all([is_valid_word(word) for word in tuple(prohibited_words)])


def test_words_list(is_valid_word: Callable[[Any], bool]):
    words_tuple = get_words_tuple()

    assert isinstance(words_tuple, tuple)
    assert len(words_tuple) > 0
    assert all([is_valid_word(word) for word in list(words_tuple)])
