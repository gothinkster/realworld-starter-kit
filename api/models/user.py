from typing import Tuple, Union

from pydantic import BaseModel, Field

from .identifier import generate_id


class UserModel(BaseModel):
    id: str = Field(default_factory=generate_id)
    username: str
    email: str
    hashed_password: str
    bio: Union[str, None] = None
    image: Union[str, None] = None
    following_ids: Tuple[str, ...] = ()
