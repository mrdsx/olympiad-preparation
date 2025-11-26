from pydantic import BaseModel


class WordExplanationResponse(BaseModel):
    word: str
    explanation: str
