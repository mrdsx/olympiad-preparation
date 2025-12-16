from collections.abc import Callable
from fastapi import status
from fastapi.testclient import TestClient
from typing import Any


from src.features.word_game import AnagramsList, AnagramsResponse
from src.shared import ErrorType, ResponseStatus


def test_get_word_with_anagrams_success(
    test_client: TestClient,
    test_base_word: str,
    test_filtered_anagrams: AnagramsList,
    is_valid_word: Callable[[Any], bool],
):
    response = test_client.get("/word-game")
    data = AnagramsResponse(**response.json())

    assert response.status_code == status.HTTP_200_OK
    assert data.base_word == test_base_word
    assert set(data.anagrams) == set(test_filtered_anagrams)

    assert isinstance(data.base_word, str)
    assert isinstance(data.anagrams, list)
    assert all([is_valid_word(anagram) for anagram in data.anagrams])


def test_get_anagrams_success(
    test_client: TestClient,
    test_base_word: str,
    test_filtered_anagrams: AnagramsList,
    is_valid_word: Callable[[Any], bool],
):
    response = test_client.get(f"/word-game/anagrams?base_word={test_base_word}")
    data = AnagramsResponse(**response.json())

    assert response.status_code == status.HTTP_200_OK
    assert data.base_word == test_base_word
    assert set(data.anagrams) == set(test_filtered_anagrams)

    assert isinstance(data.base_word, str)
    assert isinstance(data.anagrams, list)
    assert len(data.anagrams) > 0
    assert all([is_valid_word(anagram) for anagram in data.anagrams])


def test_get_anagrams_unknown_word_returns_empty_list(
    test_client: TestClient,
):
    response = test_client.get("/word-game/anagrams?base_word=б")
    data = AnagramsResponse(**response.json())

    assert response.status_code == status.HTTP_200_OK
    assert data.base_word == "б"
    assert data.anagrams == []

    assert isinstance(data.base_word, str)
    assert isinstance(data.anagrams, list)
    assert len(data.anagrams) == 0


def test_get_anagrams_empty_base_word_raises_error(
    test_client: TestClient,
):
    response = test_client.get("/word-game/anagrams?base_word=")
    data = response.json()

    assert response.status_code == status.HTTP_422_UNPROCESSABLE_CONTENT
    assert data["detail"] == {
        "status": ResponseStatus.ERROR,
        "message": "Invalid string length",
        "error_type": ErrorType.VALIDATION_ERROR,
    }


def test_get_anagrams_too_long_base_word_raises_error(
    test_client: TestClient,
):
    response = test_client.get(
        "/word-game/anagrams?base_word=слишком_длинное_слово_для_эндпоинта"
    )
    data = response.json()

    assert response.status_code == status.HTTP_422_UNPROCESSABLE_CONTENT
    assert data["detail"] == {
        "status": ResponseStatus.ERROR,
        "message": "Invalid string length",
        "error_type": ErrorType.VALIDATION_ERROR,
    }
