import pytest
from unittest.mock import AsyncMock

from src.features.gemini import ask_word_explanation


@pytest.mark.asyncio
async def test_ask_word_explanation_success(
    mock_generate_content: AsyncMock,
    word_to_explain: str,
    word_explanation: str,
):
    mock_generate_content.return_value.text = word_explanation
    explanation = await ask_word_explanation(word_to_explain)
    assert explanation == word_explanation


@pytest.mark.asyncio
async def test_ask_word_explanation_empty_text_property_returns_hyphen(
    mock_generate_content: AsyncMock,
):
    mock_generate_content.return_value.text = None
    explanation = await ask_word_explanation("абв")
    assert explanation == "-"


@pytest.mark.asyncio
async def test_ask_word_explanation_empty_string_raises_value_error():
    with pytest.raises(ValueError) as error:
        await ask_word_explanation("     ")
    assert str(error.value) == "Invalid word length"
