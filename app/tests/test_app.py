from fastapi.testclient import TestClient
from app import app


def test_root_must_ruturn_200_and_hello():
    client = TestClient(app)

    response = client.get('/')

    assert response.status_code == 200
    assert response.json() == {'message': 'Hello world!'}
