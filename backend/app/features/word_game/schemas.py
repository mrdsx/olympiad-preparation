from pydantic import BaseModel


class WordGameResponse(BaseModel):
    base_word: str
    anagrams: list[str]


class AnagramsResponse(BaseModel):
    anagrams: list[str]
