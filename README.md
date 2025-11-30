# Olympiad preparation

The purpose of this web application is to help prepare for olympiad "Наше наследие".

## How to setup

### Prerequisites

[Node.js](https://nodejs.org/en)
[bun](https://bun.com)
[Python](https://python.org)

If you have Node.js, installed on your machine, run `npm install -g bun` to install bun globally.

### Frontend

1. Navigate to frontend folder
2. Setup environment variables:

```
NEXT_PUBLIC_MEMORIZATION_TIME=3                # optional, for testing matches page
NEXT_PUBLIC_BACKEND_URL=your-backend-url.com   # PRODUCTION ONLY
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
python -m venv .venv              # setup isolated virtual environment
./.venv/Scripts/activate          # activate virtual environment (Windows)
source ./.venv/bin/activate       # activate virtual environment (Linux)
pip install poetry                # install poetry package manager
poetry install                    # install all deps using poetry
poetry run python ./src/main.py   # run project!
```

4. After running backend it's available at http://127.0.0.1:8000 (0.0.0.0:8000 in production environment)

## Running tests

Unfortunately, automatic tests are covering only backend, and tests for frontend aren't set up yet.

### Testing backend

1. Navigate to backend
2. Run this command:

```
python -m pytest ./tests
```

## Tech Stack

### Frontend

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![NextJS](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

Libraries: ShadCN (Radix UI), Tanstack Query, Lucide React, Zustand

### Backend

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)

Libraries: uvicorn, python-dotenv, google-genai, async-lru, pytest, pytest-asyncio
