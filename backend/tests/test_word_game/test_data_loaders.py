from collections.abc import Callable
from typing import Any

from src.features.word_game.data_loaders import anagrams_dictionary, words_list


def test_words_list_contains_valid_data(is_valid_word: Callable[[Any], bool]):
    assert isinstance(words_list, list)
    assert len(words_list) > 0
    assert all([is_valid_word(word) for word in words_list])


def test_anagrams_dictionary(is_valid_pair: Callable[[Any, Any], bool]):
    assert isinstance(anagrams_dictionary, dict)
    assert len(anagrams_dictionary) > 0
    assert all([is_valid_pair(k, v) for k, v in anagrams_dictionary.items()])
