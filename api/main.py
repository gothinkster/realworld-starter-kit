import logging
import os
import sys
from contextlib import asynccontextmanager

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse

from .database import get_db
from .routers.article import router as article_router
from .routers.comment import router as comment_router
from .routers.profile import router as profile_router
from .routers.tag import router as tag_router
from .routers.user import router as user_router


# Initialize couchbase connection
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Method that gets called upon app initialization \
        to initialize couchbase connection & close the connection on exit"""
    db = get_db()
    yield
    db.close()


api = FastAPI(
    title="FastAPI & Capella Conduit API",
    version="1.0.0",
    description="""
    RealWorld Conduit API built with FastAPI and Couchbase Capella.
    """,
    lifespan=lifespan,
)


logging.basicConfig(
    level=logging.INFO,
    stream=sys.stdout,
    format="%(asctime)s %(levelname)s %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)


allowed_origins = os.getenv("CORS_ALLOWED_ORIGINS", "*")
allowed_methods = os.getenv("CORS_ALLOWED_METHODS", "*")
allowed_headers = os.getenv("CORS_ALLOWED_HEADERS", "*")


api.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods= allowed_methods.split(","),
    allow_headers= allowed_headers.split(","),
)


@api.get("/health", tags=["health"])
async def health_check():
    return {"status": "ok"}


api.include_router(article_router, tags=["articles"])
api.include_router(comment_router, tags=["comments"])
api.include_router(profile_router, tags=["profiles"])
api.include_router(tag_router, tags=["tags"])
api.include_router(user_router, tags=["users"])


@api.get("/", include_in_schema=False)
def redirect_to_docs():
    return RedirectResponse(url="/docs")
