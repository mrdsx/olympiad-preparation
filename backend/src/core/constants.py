import os
from dotenv import load_dotenv

load_dotenv()

PROD_ENV = "production"
DEV_ENV = "development"
PROJECT_ENV = os.getenv("PROJECT_ENV", DEV_ENV)
PROJECT_VERSION = "7.4.0"

APP_HOST = "0.0.0.0" if PROJECT_ENV == PROD_ENV else "127.0.0.1"
APP_PORT = 8000

ALLOWED_ORIGINS = [os.getenv("ALLOWED_ORIGIN", ""), "http://localhost:3000"]

DEFAULT_CACHE_MAX_SIZE = 100  # 100 entries
DEFAULT_TTL = 60 * 60 * 24  # 24 hours
