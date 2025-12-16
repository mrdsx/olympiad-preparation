from src.features.word_game import can_build


def test_can_build_valid_anagram():
    assert can_build("спора", "диаспора")
    assert can_build("пенсион", "пенсионер")
    assert can_build("перенос", "пенсионер")
    assert can_build("пионер", "пенсионер")


def test_can_build_subset_letters():
    assert can_build("про", "проба")
    assert can_build("ба", "проба")
    assert can_build("су", "супостат")
    assert can_build("по", "супостат")


def test_can_build_same_word():
    assert can_build("загогулина", "загогулина")
    assert can_build("диаспора", "диаспора")
    assert can_build("пенсионер", "пенсионер")


def test_can_build_insufficient_length():
    assert not can_build("aaa", "aa")
    assert not can_build("барон", "нора")
    assert not can_build("спораа", "спора")


def test_can_build_case_sensitive():
    assert can_build("абв", "АБВ") is False
    assert can_build("АБВ", "абв") is False
    assert can_build("Абв", "абв") is False
