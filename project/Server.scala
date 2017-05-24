import com.typesafe.sbt.digest.Import._
import com.typesafe.sbt.gzip.Import._
import com.typesafe.sbt.jse.JsEngineImport.JsEngineKeys
import com.typesafe.sbt.less.Import._
import com.typesafe.sbt.packager.Keys._
import com.typesafe.sbt.packager.archetypes.JavaAppPackaging
import com.typesafe.sbt.packager.debian.DebianPlugin
import com.typesafe.sbt.packager.docker.DockerPlugin
import com.typesafe.sbt.packager.jdkpackager.JDKPackagerPlugin
import com.typesafe.sbt.packager.linux.LinuxPlugin
import com.typesafe.sbt.packager.rpm.RpmPlugin
import com.typesafe.sbt.packager.universal.UniversalPlugin
import com.typesafe.sbt.packager.windows.WindowsPlugin
import com.typesafe.sbt.web.Import._
import com.typesafe.sbt.web.SbtWeb
import play.routes.compiler.InjectedRoutesGenerator
import play.sbt.PlayImport.PlayKeys
import play.sbt.PlayImport.PlayKeys._
import play.sbt.PlayLayoutPlugin
import play.sbt.routes.RoutesKeys.routesGenerator
import sbt.Keys._
import sbt._
import sbtassembly.AssemblyPlugin.autoImport._
import webscalajs.WebScalaJS.autoImport.{devCommands, scalaJSPipeline, scalaJSProjects}

import scalajsbundler.sbtplugin.WebScalaJSBundlerPlugin

object Server {
  private[this] val dependencies = {
    import Dependencies._
    Seq(
      Play.playFilters,Play.playWebjars,
      Authentication.silhouette, Authentication.hasher, Authentication.persistence, Authentication.crypto,
      SharedDependencies.macwire, DatabaseUtils.flyway, DatabaseUtils.postgres,
      DatabaseUtils.quill,DatabaseUtils.quillAsync,Play.scalajsScripts, Utils.ficus, Utils.freeStyle
    )
  }

  private[this] lazy val serverSettings = Shared.commonSettings ++ Seq(
    maintainer := "",
    description := "",

    resolvers += Resolver.jcenterRepo,
    libraryDependencies ++= dependencies,
    compile in Compile := ((compile in Compile) dependsOn scalaJSPipeline).value,
    // connect to the client project
    scalaJSProjects := Seq(Client.client),
    pipelineStages in Assets := Seq(scalaJSPipeline),
    pipelineStages := Seq(digest, gzip),
//    routesGenerator := InjectedRoutesGenerator,
    externalizeResources := false,

    // Sbt-Web
    JsEngineKeys.engineType := JsEngineKeys.EngineType.Node,
    includeFilter in (Assets, LessKeys.less) := "*.less",
    excludeFilter in (Assets, LessKeys.less) := "_*.less",
    LessKeys.compress in Assets := true,

    // Fat-Jar Assembly
    fullClasspath in assembly += Attributed.blank(PlayKeys.playPackageAssets.value),
    mainClass in assembly := Some(Shared.projectName),
    addCompilerPlugin("org.scalamacros" % "paradise" % "2.1.0" cross CrossVersion.full)

    // Code Quality
    //    scapegoatIgnoredFiles := Seq(".*/Row.scala", ".*/Routes.scala", ".*/ReverseRoutes.scala", ".*/JavaScriptReverseRoutes.scala", ".*/*.template.scala")
  )

  lazy val server = (project in file("server"))
    .enablePlugins(
      SbtWeb, play.sbt.PlayScala, WebScalaJSBundlerPlugin
    )
    .disablePlugins(PlayLayoutPlugin)
    .dependsOn(Shared.sharedJvm)
    .settings(serverSettings: _*)
    .settings(Packaging.settings: _*)
  //    Shared.withProjects(ret, Seq(Shared.sharedJvm, Utilities.metrics))

}