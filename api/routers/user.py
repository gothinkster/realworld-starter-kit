from couchbase.exceptions import DocumentExistsException
from fastapi import APIRouter, Body, Depends, HTTPException, status

from ..core.exceptions import InvalidCredentialsException
from ..database import get_db
from ..models.user import UserModel
from ..schemas.user import (
    AuthenticationSchema,
    RegistrationSchema,
    UpdateUserSchema,
    UserResponseSchema,
    UserSchema,
)
from ..utils.security import (
    OAUTH2_SCHEME,
    authenticate_user,
    create_access_token,
    get_current_user,
    get_current_user_instance,
    get_password_hash,
)

router = APIRouter(
    prefix="/api",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)
USER_COLLECTION = "user"


@router.post("/users", response_model=UserResponseSchema)
async def register(
    user: RegistrationSchema = Body(..., embed=True), db=Depends(get_db)
):
    """Creates a user instance with registration data, then inserts instance to db and returns user schema."""
    user_model = UserModel(
        **user.model_dump(), hashed_password=get_password_hash(user.password)
    )
    try:
        db.insert_document(USER_COLLECTION, user_model.id, user_model.model_dump())
        token = await create_access_token(user_model)
        return UserResponseSchema(
            user=UserSchema(token=token, **user_model.model_dump())
        )
    except DocumentExistsException:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="User already exists"
        )
    except TimeoutError:
        raise HTTPException(
            status_code=status.HTTP_408_REQUEST_TIMEOUT, detail="Request timeout"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {e}",
        )


@router.post("/users/login", response_model=UserResponseSchema)
async def login_user(
    user: AuthenticationSchema = Body(..., embed=True), db=Depends(get_db)
):
    """Authenticates user with login data, creates a token and returns user schema."""
    user = await authenticate_user(user.email, user.password.get_secret_value(), db)
    if user is None:
        raise InvalidCredentialsException()
    token = await create_access_token(user)
    return UserResponseSchema(user=UserSchema(token=token, **user.model_dump()))


@router.get("/user", response_model=UserResponseSchema)
async def current_user(current_user: UserSchema = Depends(get_current_user)):
    """Queries db for current user instance by token and returns user schema."""
    return UserResponseSchema(user=current_user)


@router.put("/user", response_model=UserResponseSchema)
async def update_user(
    user: UpdateUserSchema = Body(..., embed=True),
    user_instance: UserModel = Depends(get_current_user_instance),
    token: str = Depends(OAUTH2_SCHEME),
    db=Depends(get_db),
):
    """Queries db for current user instance by token, updates it with update schema, upserts instance to db and \
        returns user schema."""
    patch_dict = user.model_dump(exclude_unset=True)
    for name, value in patch_dict.items():
        setattr(user_instance, name, value)
    try:
        db.upsert_document(
            USER_COLLECTION, user_instance.id, user_instance.model_dump()
        )
        return UserResponseSchema(
            user=UserSchema(token=token, **user_instance.model_dump())
        )
    except TimeoutError:
        raise HTTPException(
            status_code=status.HTTP_408_REQUEST_TIMEOUT, detail="Request timeout"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {e}",
        )
