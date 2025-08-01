import pytest
from unittest.mock import AsyncMock, patch
from fastapi.testclient import TestClient
from api.main import api

client = TestClient(api)

mock_RegistrationSchema = {
    "user": {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "securepassword",
    }
}

@pytest.mark.asyncio
async def test_register():
    # Mocking the database insertion and token creation
    mock_insert_document = AsyncMock()
    mock_create_access_token = AsyncMock(return_value="mock_token")

    # Patching the database insert and token creation functions
    with patch('api.database.get_db') as mock_db, \
        patch('api.routers.user.create_access_token', mock_create_access_token):
        mock_db.insert_document = mock_insert_document
        response = client.post("/api/users", json=mock_RegistrationSchema)
    
    mock_UserResponseSchema = {
        "user": {
            "username": "testuser",
            "email": "testuser@example.com",
            "token": "mock_token",
            "bio": None,
            "image": None
        }
    }

    assert response.status_code == 200
    assert response.json() == mock_UserResponseSchema
