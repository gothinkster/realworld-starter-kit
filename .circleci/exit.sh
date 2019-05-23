import logging

try:
    registry.settings['sqlalchemy.engine'].connect()
except:
    logging.exception("Could not connect")
    exit(1)

exit(0)
