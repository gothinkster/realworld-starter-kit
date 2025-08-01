from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status

from ..core.user import query_users_db
from ..database import get_db
from ..models.user import UserModel
from ..schemas.user import ProfileResponseSchema, ProfileSchema
from ..utils.security import (
    get_current_user_instance,
    get_current_user_optional_instance,
)
from .user import USER_COLLECTION

router = APIRouter(
    prefix="/api",
    tags=["profiles"],
    responses={404: {"description": "Not found"}},
)


@router.get("/profiles/{username}", response_model=ProfileResponseSchema)
async def get_profile(
    username: str,
    logged_user: Union[UserModel, None] = Depends(get_current_user_optional_instance),
    db=Depends(get_db),
):
    """Queries db for user instance by username and returns profile schema."""
    user = await query_users_db(db, username=username)
    following = logged_user is not None and user.id in logged_user.following_ids
    return ProfileResponseSchema(
        profile=ProfileSchema(following=following, **user.model_dump())
    )


@router.post("/profiles/{username}/follow", response_model=ProfileResponseSchema)
async def follow_user(
    username: str,
    user_instance: UserModel = Depends(get_current_user_instance),
    db=Depends(get_db),
):
    """Queries db for user instance by username, adds current user ID to instance's following_ids, upserts instance \
        to db and returns profile schema."""
    user_to_follow = await query_users_db(db, username=username)
    following_set = set(user_instance.following_ids) | set((user_to_follow.id,))
    user_instance.following_ids = tuple(following_set)
    try:
        db.upsert_document(
            USER_COLLECTION, user_instance.id, user_instance.model_dump()
        )
        return ProfileResponseSchema(
            profile=ProfileSchema(following=True, **user_to_follow.model_dump())
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


@router.delete("/profiles/{username}/follow", response_model=ProfileResponseSchema)
async def unfollow_user(
    username: str,
    user_instance: UserModel = Depends(get_current_user_instance),
    db=Depends(get_db),
):
    """Queries db for user instance by username, removes current user ID from instance's following_ids, upserts \
        instance to db and returns profile schema."""
    user_to_unfollow = await query_users_db(db, username=username)
    following_set = set(user_instance.following_ids) - set((user_to_unfollow.id,))
    user_instance.following_ids = tuple(following_set)
    try:
        db.upsert_document(
            USER_COLLECTION, user_instance.id, user_instance.model_dump()
        )
        return ProfileResponseSchema(
            profile=ProfileSchema(following=False, **user_to_unfollow.model_dump())
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
