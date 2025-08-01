from datetime import datetime
from typing import List, Tuple

from pydantic import BaseModel, Field, root_validator

from .identifier import generate_id, generate_random_str
from .user import UserModel


class CommentModel(BaseModel):
    id: str = Field(default_factory=generate_id)
    body: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)
    authorId: str


class ArticleModel(BaseModel):
    slug: str
    # NOTE: slug is not a primary field because it could change and this would imply to
    # change all the references
    title: str
    description: str
    body: str
    tagList: List[str] = Field(default_factory=list)
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)
    author: UserModel
    favoritedUserIDs: Tuple[str, ...] = ()
    commentIDs: Tuple[str, ...] = ()

    @root_validator(pre=True)
    def generate_slug(cls, values):
        if values.get("slug") is not None:
            return values
        title = values.get("title", "")
        words = title.split()[:5]
        words = [w.lower() for w in words]
        slug = "-".join(words) + f"-{generate_random_str()}"
        values["slug"] = slug
        if values.get("tag_list") is not None and isinstance(values["tag_list"], list):
            values["tag_list"].sort()
        return values
