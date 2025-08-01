import os

from dotenv import load_dotenv
from pydantic import Field
from pydantic.types import SecretStr
from pydantic_settings import BaseSettings


class _Settings(BaseSettings):
    load_dotenv()
    SECRET_KEY: SecretStr = Field(os.getenv("JWT_SECRET"))
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30


# Make this a singleton to avoid reloading it from the env everytime
SETTINGS = _Settings()
