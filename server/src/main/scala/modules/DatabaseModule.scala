package modules

import com.softwaremill.macwire.wire
import io.getquill.{PostgresAsyncContext, SnakeCase}
import services.UniversityService

import scala.concurrent.ExecutionContext

/**
 * Created by shubham on 24/5/17.
 */
trait DatabaseModule {
  // quill
  implicit def executionContext: ExecutionContext
  lazy val dbCtx = new PostgresAsyncContext[SnakeCase]("ctx")
  lazy val universityService = wire[UniversityService]
}
