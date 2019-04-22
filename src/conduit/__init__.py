"""Package initializer."""

from pyramid.config import Configurator
from pyramid_heroku import expandvars_dict

import typing as t


def main(global_config: t.Dict[str, str], **settings):
    """Return a Pyramid WSGI application."""
    settings = expandvars_dict(settings)

    config = Configurator(settings=settings)

    # Configure DB
    config.include("pyramid_deferred_sqla")
    config.sqlalchemy_engine(pool_size=5, max_overflow=1, pool_timeout=5)

    # up up and away!
    return config.make_wsgi_app()
