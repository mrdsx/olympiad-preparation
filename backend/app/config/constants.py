import os
from enum import StrEnum

from dotenv import load_dotenv

load_dotenv()

APP_HOST = os.getenv("APP_HOST", "0.0.0.0")
APP_PORT = 8000


class ResponseStatus(StrEnum):
    OK = "ok"
    ERROR = "error"
