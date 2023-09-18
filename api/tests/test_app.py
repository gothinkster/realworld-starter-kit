from fastapi.testclient import TestClient
from api.app import app

client = TestClient(app)


def test_root_must_return_200_hello_world():
    client = TestClient(app)

    response = client.get('/')

    assert response.status_code == 200
    assert response.json() == {'message': 'Hello, world!'}
