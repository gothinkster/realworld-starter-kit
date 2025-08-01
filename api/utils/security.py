import json
from datetime import datetime, timedelta
from typing import Union, cast

from fastapi import Depends, FastAPI, HTTPException
from fastapi.openapi.models import OAuthFlows
from fastapi.security import OAuth2
from fastapi.security.utils import get_authorization_scheme_param
from jose import JWTError, jwt
from jose.exceptions import ExpiredSignatureError
from passlib.context import CryptContext
from pydantic import BaseModel, ValidationError
from starlette.requests import Request

from ..core.exceptions import CredentialsException, NotAuthenticatedException
from ..database import get_db
from ..models.user import UserModel
from ..schemas.user import UserSchema
from ..settings import SETTINGS


class TokenModel(BaseModel):
    access_token: str
    token_type: str


class TokenContentModel(BaseModel):
    username: str


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class OAuth2PasswordToken(OAuth2):
    def __init__(
        self,
        tokenUrl: str,
        scheme_name: Union[str, None] = None,
        scopes: Union[dict, None] = None,
    ):
        if not scopes:
            scopes = {}
        flows = OAuthFlows(password={"tokenUrl": tokenUrl, "scopes": scopes})
        super().__init__(flows=flows, scheme_name=scheme_name, auto_error=False)

    async def __call__(self, request: Request) -> Union[str, None]:
        authorization: str = request.headers.get("Authorization")
        scheme, param = get_authorization_scheme_param(authorization)
        if not authorization or scheme.lower() != "token":
            return None
        return cast(str, param)


OAUTH2_SCHEME = OAuth2PasswordToken(tokenUrl="/users")


api = FastAPI()


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


async def get_user_instance(
    db,
    email: Union[str, None] = None,
    username: Union[str, None] = None,
):
    """Queries db for user instance by email or username and returns user instance or none."""
    if username is not None:
        query = """
            SELECT `user`.* FROM `user` WHERE `user`.username=$username;
        """
    elif email is not None:
        query = """
            SELECT `user`.* FROM `user` WHERE `user`.email=$email;
        """
    else:
        return None
    queryResult = db.query(query, email=email, username=username)
    user_data = [r for r in queryResult]
    if not user_data:
        raise NotAuthenticatedException()
    else:
        return UserModel(**user_data[0])


async def authenticate_user(email: str, password: str, db):
    """Queries db for user instance by email, compares password to instance's hashed password and returns user \
        instance if verified."""
    user = await get_user_instance(db, email=email)
    if not user or not verify_password(password, user.hashed_password):
        return False
    return user


async def create_access_token(user: UserModel) -> str:
    """Create an access token based on the user's username."""
    token_content = TokenContentModel(username=user.username)
    expire = datetime.utcnow() + timedelta(minutes=SETTINGS.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"exp": expire, "sub": token_content.model_dump_json()}
    encoded_jwt = jwt.encode(
        to_encode, SETTINGS.SECRET_KEY.get_secret_value(), algorithm=SETTINGS.ALGORITHM
    )
    return str(encoded_jwt)


async def get_current_user_instance(
    db=Depends(get_db),
    token: Union[str, None] = Depends(OAUTH2_SCHEME),
) -> UserModel:
    """Decode JWT, queries db for user instance by username and returns user instance."""
    if token is None:
        raise NotAuthenticatedException()
    try:
        payload = jwt.decode(
            token,
            SETTINGS.SECRET_KEY.get_secret_value(),
            algorithms=[SETTINGS.ALGORITHM],
        )
    except ExpiredSignatureError:
        raise CredentialsException()
    except JWTError:
        raise CredentialsException()
    try:
        payload_model = json.loads(payload.get("sub"))
        token_content = TokenContentModel(**payload_model)
    except ValidationError:
        raise CredentialsException()
    user = await get_user_instance(db, username=token_content.username)
    if user is None:
        raise CredentialsException()
    return user


async def get_current_user_optional_instance(
    db=Depends(get_db),
    token: str = Depends(OAUTH2_SCHEME),
) -> Union[UserModel, None]:
    """Queries db for user instance by token and return user instance or none."""
    try:
        user = await get_current_user_instance(db, token)
        return user
    except HTTPException:
        return None


async def get_current_user(
    user_instance: UserModel = Depends(get_current_user_instance),
    token: str = Depends(OAUTH2_SCHEME),
) -> UserSchema:
    """Queries db for user instance by token and returns user schema."""
    return UserSchema(token=token, **user_instance.model_dump())
