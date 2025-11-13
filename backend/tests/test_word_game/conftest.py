import pytest
from typing import Any


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
