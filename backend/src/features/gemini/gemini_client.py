from google.genai import Client as GeminiClient

from .constants import AI_API_KEY


client = GeminiClient(api_key=AI_API_KEY).aio
