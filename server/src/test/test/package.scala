import modules.DatabaseModule
import org.flywaydb.core.Flyway
import org.scalatest.TestSuite
import org.scalatest.concurrent.ScalaFutures
import org.scalatest.time.{Millis, Seconds, Span}
import org.scalatestplus.play.{BaseOneAppPerTest, FakeApplicationFactory}
import play.api._
import play.core.DefaultWebCommands

import scala.concurrent.ExecutionContext

package object test {

  object DbSetup {
    val connectionString = "jdbc:postgresql:omis?user=omis&password=omis"

    def dbSetup(): Unit = {
      val flyway = new Flyway()
      flyway.setDataSource(connectionString, null, null)
      flyway.clean()
      flyway.migrate()
    }
  }

  trait ApplicationFactory extends FakeApplicationFactory{
    DbSetup.dbSetup()
    class ApplicationBuilder{
      def build(): Application = {
        val env = Environment.simple()
        val context = ApplicationLoader.Context(
          environment = env,
          sourceMapper = None,
          webCommands = new DefaultWebCommands(),
          initialConfiguration = Configuration.load(env)
        )
        val loader = new ServerLoader()
        loader.load(context)
      }
    }

    override def fakeApplication(): Application = {
      new ApplicationBuilder().build()
    }
  }

  trait AppOneAppPerTest extends BaseOneAppPerTest with ApplicationFactory {
    this: TestSuite with FakeApplicationFactory =>
  }



  trait BaseSpec extends ScalaFutures{
    implicit override val patienceConfig = PatienceConfig(
      timeout = Span(2, Seconds),
      interval = Span(5, Millis)
    )
    val db = new DatabaseModule {
      override implicit def executionContext: ExecutionContext = scala.concurrent.ExecutionContext.Implicits.global
    }
  }
}
