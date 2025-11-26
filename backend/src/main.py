import uvicorn

from config import APP_HOST, APP_PORT, DEV_ENV, PROJECT_ENV


def main() -> None:
    uvicorn.run(
        app="app:app",
        host=APP_HOST,
        port=APP_PORT,
        reload=PROJECT_ENV == DEV_ENV,
    )


if __name__ == "__main__":
    main()
