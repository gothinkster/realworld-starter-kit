package services

import io.getquill.{PostgresAsyncContext, SnakeCase}

/**
 * Created by shubham on 22/5/17.
 */
class Database(ctx: PostgresAsyncContext[SnakeCase]) {

  import ctx._
}
