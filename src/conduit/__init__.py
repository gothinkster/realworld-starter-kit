"""Package initializer."""

from pyramid.config import Configurator

import typing as t


def main(global_config: t.Dict[str, str], **settings):
    """Return a Pyramid WSGI application."""

    config = Configurator(settings=settings)

    # up up and away!
    return config.make_wsgi_app()
