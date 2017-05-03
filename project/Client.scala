import org.scalajs.sbtplugin.ScalaJSPlugin
import org.scalajs.sbtplugin.ScalaJSPlugin.autoImport._
import sbt.Keys._
import sbt._
import webscalajs.ScalaJSWeb

object Client {
  private[this] val clientSettings = Shared.commonSettings ++ Seq(
    name := "client",
    resolvers += sbt.Resolver.bintrayRepo("denigma", "denigma-releases"),
    libraryDependencies ++= ClientDependencies.scalajsDependencies.value,
    jsDependencies ++= ClientDependencies.jsDependencies.value,
    // RuntimeDOM is needed for tests
    jsDependencies += RuntimeDOM % "test",
    // yes, we want to package JS dependencies
    skip in packageJSDependencies := false,
    // use Scala.js provided launcher code to start the client app
    scalaJSUseMainModuleInitializer := true,
    scalaJSStage in Global := FastOptStage
    //    scapegoatIgnoredFiles := Seq(".*/JsonUtils.scala", ".*/JsonSerializers.scala")
  )

  lazy val client = (project in file("client"))
    .settings(clientSettings: _*)
    .enablePlugins(ScalaJSPlugin, ScalaJSWeb)
    .dependsOn(Shared.sharedJs)
}