import std/[logging]

from ../users/models import createUserTables


proc setLoggingLevel*() =
  addHandler(newConsoleLogger())
  logging.setLogFilter(lvlInfo)


proc createDatabaseTables*() =
  createUserTables()
  logging.info("Done creating tables")
