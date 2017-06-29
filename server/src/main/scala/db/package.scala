import io.getquill.{PostgresAsyncContext, SnakeCase}

package object db {
  type DbContext = PostgresAsyncContext[SnakeCase]
}
