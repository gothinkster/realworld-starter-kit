from sqlalchemy import select

from api.models import User


def test_create_user(session):
    new_user = User(username='alice', password='secret', email='test@test')
    session.add(new_user)
    session.commit()

    user = session.scalar(select(User).where(User.username == 'alice'))

    assert user.username == 'alice'
