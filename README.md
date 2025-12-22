# Olympiad preparation

Olympiad Preparation is a full stack web application designed to help you prepare for the olympiad "Наше наследие".

## How to setup

### Prerequisites

- [Node.js](https://nodejs.org/en)
- [bun](https://bun.com)
- [Python](https://python.org)
- [Poetry](https://python-poetry.org/)

#### Bun installation

If you have Node.js, installed on your machine, run `npm install -g bun` to install bun globally.

#### Poetry installation

In order to install Poetry follow instructions at [official website](https://python-poetry.org/docs/#installing-with-the-official-installer). After installation make sure you installed version 2.0.0 or higher.

### Frontend

1. Navigate to frontend folder
2. Setup environment variables:

```
VITE_MEMORIZATION_TIME=3                # optional, for testing matches page
VITE_WRITING_ANSWERS_TIME=10            # optional, for testing matches page
VITE_BACKEND_URL=your-backend-url.com   # PRODUCTION ONLY
```

3. Run these commands:

```
bun install    # install all deps
bun dev        # run project!
```

4. After running frontend it's available at http://localhost:3000

### Backend

1. Navigate to backend folder
2. Setup environment variables:

```
GEMINI_API_KEY=your-api-key
ALLOWED_ORIGIN=frontend-url.com   # PRODUCTION ONLY
PROJECT_ENV=production            # PRODUCTION ONLY
```

Gemini API key can be obtained in [Google AI Studio](https://aistudio.google.com/api-keys).

3. Run these commands:

```
poetry install                    # install deps (development)
poetry install --without test     # install deps (production)
poetry run python src/run.py      # run project!
```

4. After running backend it's available at http://127.0.0.1:8000 (0.0.0.0:8000 in production environment)

## Running tests

Unfortunately, automatic tests are covering only backend, and tests for frontend aren't set up yet.

### Testing backend

1. Navigate to backend
2. Run tests:

```
poetry run pytest tests
```

## Tech Stack

### Frontend

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Libraries: Zustand, Tanstack Query, React Router, Radix UI, Lucide React, Prettier

### Backend

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)

Libraries: uvicorn, python-dotenv, google-genai, async-lru, pytest, pytest-asyncio
