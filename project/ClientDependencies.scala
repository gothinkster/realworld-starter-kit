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
    "org.scala-js" %%% "scalajs-dom" % "0.9.1",
    "io.suzaku" %%% "diode" % "1.1.2",
    "io.suzaku" %%% "diode-react" % "1.1.2",
    "org.querki" %%% "jquery-facade" % "1.0",
    "org.querki" %%% "querki-jsext" % "0.8",
    "org.querki" %%% "bootstrap-datepicker-facade" % "0.8",
    "ru.pavkin" %%% "scala-js-momentjs" % "0.8.0"
  ))

//  /**Npm dependencies */
//  val npmDependencies = Def.setting((Seq(
//    "react" -> "15.5.4",
//    "react-dom" -> "15.5.4",
//    "expose-loader" -> "0.7.1"
//  )))

  /** Dependencies for external JS libs that are bundled into a single .js file according to dependency order */
  val jsDependencies = Def.setting(Seq(
    "org.webjars.npm" % "react" % "15.5.4" / "react-with-addons.min.js" commonJSName "React",
    "org.webjars.npm" % "react-dom" % "15.5.4" / "react-dom.min.js" commonJSName "ReactDOM" dependsOn "react-with-addons.min.js",
    "org.webjars" % "jquery" % "2.2.4" / "jquery.min.js",
    "org.webjars" % "bootstrap" % "3.3.7" / "bootstrap.min.js" dependsOn "jquery.min.js",
    "org.webjars" % "bootstrap-datepicker" % "1.6.4" / "bootstrap-datepicker.min.js" dependsOn "bootstrap.min.js",
    "org.webjars.npm" % "github-com-1000hz-bootstrap-validator" % "0.11.5" / "docs/dist/validator.min.js" dependsOn "jquery.min.js",
    "org.webjars.npm" % "jdenticon" % "1.3.2" / "jdenticon.min.js"
  ))


}
