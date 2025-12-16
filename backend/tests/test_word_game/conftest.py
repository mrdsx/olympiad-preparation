import pytest
from collections.abc import Generator
from fastapi.testclient import TestClient
from typing import Any

from src.features.word_game import (
    AnagramsDictionary,
    AnagramsList,
    get_anagrams_dictionary,
    get_prohibited_words_set,
    get_words_tuple,
    ProhibitedWordsSet,
    WordsTuple,
)
from src.main import app


@pytest.fixture(scope="package")
def test_base_word() -> str:
    return "пенсионер"


@pytest.fixture(scope="package")
def test_anagrams() -> AnagramsList:
    return [
        "пенсион",
        "перенос",
        "сопение",
        "пионер",
        "пенис",
        "прение",
        "роение",
        "пение",
        "пирон",
        "сироп",
        "перс",
    ]


@pytest.fixture(scope="package")
def test_filtered_anagrams() -> AnagramsList:
    return [
        "пенсион",
        "перенос",
        "сопение",
        "пионер",
        "прение",
        "роение",
        "пение",
        "пирон",
        "сироп",
        "перс",
    ]


@pytest.fixture(scope="package")
def test_anagrams_dictionary(
    test_base_word: str, test_anagrams: AnagramsList
) -> AnagramsDictionary:
    return {test_base_word: test_anagrams}


@pytest.fixture(scope="package")
def test_prohibited_words_set() -> ProhibitedWordsSet:
    return set(["пенис"])


@pytest.fixture(scope="package")
def test_words_tuple() -> WordsTuple:
    return tuple(
        [
            "пенсионер",
            "пенсион",
            "перенос",
            "сопение",
            "пионер",
            "прение",
            "роение",
            "пение",
            "пенис",
            "пирон",
            "сироп",
            "перс",
        ]
    )


@pytest.fixture(scope="package")
def test_filtered_words_tuple() -> WordsTuple:
    return tuple(
        [
            "пенсионер",
            "пенсион",
            "перенос",
            "сопение",
            "пионер",
            "прение",
            "роение",
            "пение",
            "пирон",
            "сироп",
            "перс",
        ]
    )


@pytest.fixture(scope="package")
def test_client(
    test_anagrams_dictionary: AnagramsDictionary,
    test_prohibited_words_set: ProhibitedWordsSet,
    test_words_tuple: WordsTuple,
) -> Generator[TestClient]:
    get_anagrams_dictionary.cache_clear()
    get_prohibited_words_set.cache_clear()
    get_words_tuple.cache_clear()

    app.dependency_overrides[get_anagrams_dictionary] = lambda: test_anagrams_dictionary
    app.dependency_overrides[get_prohibited_words_set] = (
        lambda: test_prohibited_words_set
    )
    app.dependency_overrides[get_words_tuple] = lambda: test_words_tuple

    with TestClient(app) as client:
        yield client

    app.dependency_overrides.clear()


@pytest.fixture(scope="package")
def is_valid_word():
    def func(word: Any) -> bool:
        return len(word) > 0 and isinstance(word, str)

    return func


@pytest.fixture(scope="package")
def is_valid_pair():
    def func(key: Any, value: Any) -> bool:
        return isinstance(key, str) and isinstance(value, list)

    return func
