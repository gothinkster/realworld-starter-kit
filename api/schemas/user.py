from typing import Union

from pydantic import SecretStr

from .base import BaseSchema


class AuthenticationSchema(BaseSchema):
    email: str
    password: SecretStr


class RegistrationSchema(BaseSchema):
    username: str
    email: str
    password: str


class UserSchema(BaseSchema):
    email: str
    token: str
    username: str
    bio: Union[str, None] = None
    image: Union[str, None] = None


class UserResponseSchema(BaseSchema):
    user: UserSchema


class UpdateUserSchema(BaseSchema):
    email: Union[str, None] = None
    token: Union[str, None] = None
    username: Union[str, None] = None
    bio: Union[str, None] = None
    image: Union[str, None] = None


class ProfileSchema(BaseSchema):
    username: str
    bio: Union[str, None] = None
    image: Union[str, None] = None
    following: bool = False


class ProfileResponseSchema(BaseSchema):
    profile: ProfileSchema
