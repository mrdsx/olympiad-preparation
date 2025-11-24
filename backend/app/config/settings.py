import os

from dotenv import load_dotenv

load_dotenv()

APP_HOST = os.getenv("APP_HOST", "0.0.0.0")
APP_PORT = 8000

DEFAULT_CACHE_MAX_SIZE = 100  # entires number
DEFAULT_TTL = 60 * 60 * 24  # seconds
