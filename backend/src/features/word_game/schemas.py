from pydantic import BaseModel


class AnagramsResponse(BaseModel):
    base_word: str
    anagrams: list[str]
