import io.getquill.{PostgresAsyncContext, PostgresJdbcContext, SnakeCase}

package object db {

  type DbContext = PostgresJdbcContext[SnakeCase]

}
