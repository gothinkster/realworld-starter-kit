"""Installer for the conduit package."""

from setuptools import find_packages
from setuptools import setup

setup(
    name="conduit",
    version="0.1",
    description="Pyramid and OpenAPI3 based RealWorld.io example.",
    classifiers=[
        "Programming Language :: Python",
        "Programming Language :: Python :: 3.7",
        "Framework :: Pyramid",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
        "License :: MIT",
    ],
    author="Niteo",
    author_email="info@niteo.co",
    url="http://github.com/niteoweb/pyramid-realworld-example-app",
    keywords="pyramid openapi realworld",
    license="MIT",
    packages=find_packages("src", exclude=["ez_setup"]),
    package_dir={"": "src"},
    include_package_data=True,
    zip_safe=False,
    entry_points="""\
    [paste.app_factory]
    main = conduit:main
    """,
    test_suite="conduit",
)
