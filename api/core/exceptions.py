from fastapi import HTTPException, status


class EmptyEnvironmentVariableError(HTTPException):
    def __init__(self, var_name: str) -> None:
        super().__init__(
            status_code=status.HTTP_204_NO_CONTENT,
            detail=f"Environment variable '{var_name}' cannot be an empty string",
        )


class UserNotFoundException(HTTPException):
    def __init__(self) -> None:
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")


class ArticleNotFoundException(HTTPException):
    def __init__(self) -> None:
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND, detail="Article not found"
        )


class CommentNotFoundException(HTTPException):
    def __init__(self) -> None:
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND, detail="Comment not found"
        )


class NotArticleAuthorException(HTTPException):
    def __init__(self) -> None:
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User is not author of the article",
        )


class NotAuthenticatedException(HTTPException):
    def __init__(self) -> None:
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Token"},
        )


class CredentialsException(HTTPException):
    def __init__(self) -> None:
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Token"},
        )


class InvalidCredentialsException(HTTPException):
    def __init__(self) -> None:
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Token"},
        )
