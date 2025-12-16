from pydantic import BaseModel

from .types import AnagramsList


class AnagramsResponse(BaseModel):
    base_word: str
    anagrams: AnagramsList
