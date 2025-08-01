from uuid import uuid4


def generate_id():
    """Generates uuid ID."""
    return str(uuid4())


def generate_random_str():
    """Generates uuid random string."""
    s = str(uuid4())
    return s.split("-")[0]
