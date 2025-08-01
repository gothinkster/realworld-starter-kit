from fastapi import APIRouter, Depends, HTTPException, status

from ..database import get_db
from ..schemas.tag import TagsResponseSchema

router = APIRouter(
    prefix="/api",
    tags=["tags"],
    responses={404: {"description": "Not found"}},
)


@router.get("/tags", response_model=TagsResponseSchema)
async def get_tags(db=Depends(get_db)):
    """Queries db for tags and returns tags schema."""
    query = """
        SELECT article.tagList
        FROM article as article;
    """
    try:
        queryResult = db.query(query)
        result_list = [r for r in queryResult]
        if len(result_list) > 0:
            return TagsResponseSchema(
                tags=[tags for tagList in result_list for tags in tagList["tagList"]]
            )
        else:
            return TagsResponseSchema(tags=[])
    except TimeoutError:
        raise HTTPException(
            status_code=status.HTTP_408_REQUEST_TIMEOUT, detail="Request timeout"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {e}",
        )
