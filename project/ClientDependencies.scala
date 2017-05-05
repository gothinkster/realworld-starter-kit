import org.scalajs.sbtplugin.ScalaJSPlugin.autoImport._
import sbt._

/**
  * Application settings. Configure the build for your application here.
  * You normally don't have to touch the actual build definition after this.
  */
object ClientDependencies {

  /** Dependencies only used by the JS project (note the use of %%% instead of %%) */
  val scalajsDependencies = Def.setting(Seq(
    "com.github.japgolly.scalajs-react" %%% "core" % "1.0.0",
    "com.github.japgolly.scalajs-react" %%% "extra" % "1.0.0",
    "com.github.japgolly.scalacss" %%% "ext-react" % "0.5.3",
    "org.scala-js" %%% "scalajs-dom" % "0.9.1"
  ))

  /** Dependencies for external JS libs that are bundled into a single .js file according to dependency order */
  val jsDependencies = Def.setting(Seq(
    "org.webjars.npm" % "react" % "15.5.4" / "react-with-addons.min.js" commonJSName "React",
    "org.webjars.npm" % "react-dom" % "15.5.4" / "react-dom.min.js" commonJSName "ReactDOM" dependsOn "react-with-addons.min.js"
  ))

}
