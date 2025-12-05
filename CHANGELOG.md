# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Version numbers are stored in: `frontend/package.json`, `backend/src/config/constants.py` and `backend/pyproject.toml`.

## [4.0.1] - December 6, 2025

### Fixed

- Add vercel config to fix routing issues

## [4.0.0] - December 5, 2025

### Changed

- Migrate from Next.js to plain React.js

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
