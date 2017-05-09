import org.scalajs.sbtplugin.ScalaJSPlugin
import org.scalajs.sbtplugin.ScalaJSPlugin.autoImport._
import sbt.Keys._
import sbt._
import webscalajs.ScalaJSWeb

import scalajsbundler.sbtplugin.ScalaJSBundlerPlugin
import scalajsbundler.sbtplugin.ScalaJSBundlerPlugin.autoImport._

object Client {
  private[this] val clientSettings = Shared.commonSettings ++ Seq(
    name := "client",
    libraryDependencies ++= ClientDependencies.scalajsDependencies.value,
    // npm dependencies
    npmDependencies in Compile ++= ClientDependencies.npmDependencies.value,
    webpackConfigFile := Some(baseDirectory.value / "webpack.config.js"),
    // RuntimeDOM is needed for tests
    jsDependencies += RuntimeDOM % "test",
    // yes, we want to package JS dependencies
    skip in packageJSDependencies := false,
    // use Scala.js provided launcher code to start the client app
    scalaJSUseMainModuleInitializer := true,
    scalaJSStage in Global := FastOptStage,
    useYarn := true
//    enableReloadWorkflow := true,
//    emitSourceMaps := false
    //    scapegoatIgnoredFiles := Seq(".*/JsonUtils.scala", ".*/JsonSerializers.scala")
  )

  lazy val client = (project in file("client"))
    .settings(clientSettings: _*)
    .enablePlugins(ScalaJSPlugin, ScalaJSWeb, ScalaJSBundlerPlugin)
    .dependsOn(Shared.sharedJs)
}