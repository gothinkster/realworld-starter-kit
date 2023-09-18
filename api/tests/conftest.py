import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from api.app import app
from api.models import Base


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def session():
    engine = create_engine('sqlite:///:memory:')
    Session = sessionmaker(bind=engine)
    Base.metadata.create_all(engine)
    yield Session()
    Base.metadata.drop_all(engine)
