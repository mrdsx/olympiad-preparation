from src.features.word_game import (
    AnagramsDictionary,
    AnagramsList,
    generate_anagrams,
    ProhibitedWordsSet,
    search_anagrams,
    WordsTuple,
)


def test_search_valid_anagrams():
    anagrams = search_anagrams(
        "диаспора",
        (
            "апис",
            "арап",
            "диаспора",
            "опус",
            "орда",
            "проба",
            "распад",
            "спор",
            "спора",
        ),
    )
    assert set(anagrams) == set(["апис", "арап", "орда", "распад", "спор", "спора"])


def test_search_anagrams_no_different_words():
    anagrams = search_anagrams("диаспора", ("диаспора",))
    assert len(anagrams) == 0


def test_search_invalid_anagrams():
    anagrams = search_anagrams(
        "диаспора",
        (
            "абракадабра",
            "дофамин",
            "иждивенец",
            "опус",
            "орудие",
            "проба",
            "рост",
            "споровик",
            "стопор",
            "сужение",
        ),
    )
    assert len(anagrams) == 0


def test_generate_anagrams_for_known_word(
    test_base_word: str,
    test_anagrams_dictionary: AnagramsDictionary,
    test_filtered_anagrams: AnagramsList,
    test_prohibited_words_set: ProhibitedWordsSet,
):
    anagrams = generate_anagrams(
        test_base_word,
        test_anagrams_dictionary,
        test_prohibited_words_set,
        (),
    )
    assert set(anagrams) == set(test_filtered_anagrams)


def test_generate_anagrams_for_unknown_word(
    test_anagrams_dictionary: AnagramsDictionary,
    test_filtered_words_tuple: WordsTuple,
    test_prohibited_words_set: ProhibitedWordsSet,
    test_words_tuple: WordsTuple,
):
    anagrams = generate_anagrams(
        "пенсионерр",
        test_anagrams_dictionary,
        test_prohibited_words_set,
        test_words_tuple,
    )
    assert set(anagrams) == set(test_filtered_words_tuple)
