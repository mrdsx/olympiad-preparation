# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Version numbers are stored in: `frontend/package.json`, `backend/src/config/constants.py` and `backend/pyproject.toml`.

## [7.2.3] - December 19, 2025

### Fixed

- Fix matches generation
  - Fix case where 3 matches from same group form diagonal

## [7.2.2] - December 19, 2025

### Changed

- Refine matches generation
  - Reduce chances of introducing 3 matches from same group within column in 5x6 grid

## [7.2.1] - December 18, 2025

### Changed

- Edit matches generation
  - Remove privileged group constraint (view release `7.2.0`)

### Fixed

- Fix countdown responsive styles
- Fix select components styles on matches page

## [7.2.0] - December 18, 2025

### Added

- Add countdown settings popover
- Add toggle matches visibility button
- Add exporting matches into file

### Changed

- Refine matches generation
  - Add privileged group constraint with 1 duplicate allowed per column

## [7.1.0] - December 16, 2025

### Added

- Add filtering out prohibited words in word game
- Add tooltip to olympiad stage switch
- Add script for updating version number across multiple files
- Add tests for word game services and utils

### Changed

- Refine matches generation
- Update word game router and data loaders tests

### Fixed

- Fix long anagram explanation goes beyond the screen

## [7.0.1] - December 13, 2025

### Changed

- Update backend setup flow

## [7.0.0] - December 12, 2025

### Changed

- Refine significantly matches generation
- Replace checkbox with switch component on matches page
- Update footer text in anagram explanation popover

### Fixed

- Fix images titles going beyond cell area

## [6.0.0] - December 8, 2025

### Added

- Add dataset page for testing if images' titles are displayed correctly

### Changed

- Update README description and installation section
- Revert to versioning style from release `4.2.0`

## [5.0.0] - December 7, 2025

### Added

- Add school grades group: 2, 3-4, 5-6
- Add images for final stage (grades: 3-4, 5-6)

### Changed

- Rename school grade `9-11` to `7-11`
- Update select components order on matches page
- Update `Tech Stack` section in README
- Update previous changelog notes

### Removed

- Remove school grade group 2-4

## [4.0.2] - December 6, 2025

### Fixed

- Fix button styles on PC version
- Fix matches aren't displayed

## [4.0.1] - December 6, 2025

### Fixed

- Fix routing issues

## [4.0.0] - December 5, 2025

### Changed

- Migrate from Server-Side Rendering to Client-Side Rendering

## [3.1.0] - December 5, 2025

### Added

- Add 2-4 grades images to matches page

### Changed

- Transfer matches images to CDN

### Fixed

- Fix responsiveness issues in matches countdown

## [3.0.3] - December 5, 2025

### Changed

- Update frontend dependencies (including those with critical issues)
- Update backend read_root endpoint
- Update backend tests

## [3.0.2.1] - November 30, 2025

### Changed

- Update README
  - Turn prerequisites list into bullet list

## [3.0.2] - November 30, 2025

### Added

- Add changelog

### Changed

- Update README
  - Update project setup section

### Fixed

- Fix word normalization on backend

## [3.0.1] - November 27, 2025

### Added

- Add tests to backend

### Changed

- Update README
  - Add new sections: project setup, running tests, project dependencies

### Fixed

- Fix validation error isn't handled on backend

## [3.0.0] - November 24, 2025

### Added

- Add anagrams caching on backend
- Add expressions page
- Add footer
- Add user word normalization to the word game page

### Changed

- Change remaining time countdown styles on the matches page

## [2.1.0] - November 10, 2025

### Added

- Add AI-powered anagrams explanation generation to the word game page
  - User can click on anagram and popover with word explanation will appear

### Changed

- Change remaining time countdown styles on the matches page

## [2.0.0] - November 6, 2025

### Added

- Implement word game
  - User can generate word with anagrams
  - User can generate anagrams from word
- Add home page
- Add backend logic
- Add README and LICENSE files

### Changed

- Change remaining time countdown style on the matches page

## [1.0.0] - August 22, 2025

### Added

- Implement new page for training matches memorization
  - Users can generate images in random order and choose grid layout
  - Users can see remaining time
  - Users can see answers
  - Users' preferences are persistent
- Add Server-Side Rendering for faster images loading
- Setup initial UI design and frontend
