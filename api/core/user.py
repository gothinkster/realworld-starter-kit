from typing import Union

from fastapi import HTTPException, status

from ..models.user import UserModel
from .exceptions import UserNotFoundException


async def query_users_db(
    db,
    id: Union[str, None] = None,
    username: Union[str, None] = None,
) -> UserModel:
    """Query db for user instance by ID or username and returns instance."""
    if id is not None:
        query = """
            SELECT `user`.* FROM `user` WHERE `user`.id=$id;
        """
    elif username is not None:
        query = """
            SELECT `user`.* FROM `user` WHERE `user`.username=$username;
        """
    else:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            details="No ID or username provided",
        )
    try:
        queryResult = db.query(query, id=id, username=username)
        response_data = [r for r in queryResult]
        if not response_data:
            raise UserNotFoundException()
        else:
            return UserModel(**response_data[0])
    except TimeoutError:
        raise HTTPException(
            status_code=status.HTTP_408_REQUEST_TIMEOUT, detail="Request timeout"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {e}",
        )
