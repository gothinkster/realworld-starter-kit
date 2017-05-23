package services

import com.realworld.shared.models.User
import io.getquill.{PostgresAsyncContext, SnakeCase}

/**
 * Created by shubham on 22/5/17.
 */
class UserDB(ctx: PostgresAsyncContext[SnakeCase]) {
  import ctx._
  val users = quote(querySchema[User]("users"))
//  def addUser(user: User) = ctx.run(users.)
}
