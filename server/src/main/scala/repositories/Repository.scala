package repositories

import db.DbContext

trait Repository {
  val ctx: DbContext
}
