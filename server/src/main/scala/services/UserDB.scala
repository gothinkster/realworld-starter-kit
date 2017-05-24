package services

import com.realworld.shared.models.User
import io.getquill.{PostgresJdbcContext, SnakeCase}
/**
 * .
 */
class UserDB() {
  lazy val ctx = new PostgresJdbcContext[SnakeCase]("ctx")
  import ctx._
  val users = quote(querySchema[User]("users"))
  //    def addUser(user: User) = ctx.run(users.)
}
