package modules

import com.realworld.shared.models.User
import com.softwaremill.macwire.wire
import io.getquill.{PostgresAsyncContext, PostgresJdbcContext, SnakeCase}
import org.flywaydb.play.FlywayPlayComponents
import services.{UniversityDB, UserDB}

/**
 * Created by shubham on 24/5/17.
 */
trait DatabaseModule {
  // quill
  lazy val dbCtx = new PostgresJdbcContext[SnakeCase]("ctx")
  lazy val userdb = wire[UserDB]
  lazy val universitydb = wire[UniversityDB]
}
