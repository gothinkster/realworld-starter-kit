from typing import List

from .base import BaseSchema


class TagsResponseSchema(BaseSchema):
    tags: List[str]
