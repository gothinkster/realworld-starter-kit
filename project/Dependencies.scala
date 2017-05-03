import sbt._

object Dependencies {

  object Cache {
    val ehCache = "net.sf.ehcache" % "ehcache-core" % "2.6.11"
  }

  object Logging {
    val slf4jApi = "org.slf4j" % "slf4j-api" % "1.7.21"
  }

  object Play {
    private[this] val version = "2.5.12"
    val playFilters = play.sbt.PlayImport.filters
    val playWebjars = "org.webjars" %% "webjars-play" % "2.5.0-4"
    val scalajsScripts = "com.vmunier" %% "scalajs-scripts" % "1.0.0"
  }

  object Authentication {
    private[this] val version = "4.0.0"
    val silhouette = "com.mohiva" %% "play-silhouette" % version
    val hasher = "com.mohiva" %% "play-silhouette-password-bcrypt" % version
    val persistence = "com.mohiva" %% "play-silhouette-persistence" % version
    val crypto = "com.mohiva" %% "play-silhouette-crypto-jca" % version
  }

  object SharedDependencies {
    val macwireVersion = "2.3.0"
    val macwire = "com.softwaremill.macwire" %% "macros" % macwireVersion
  }

  object WebJars {
  }

  object Utils {
    val ficus = "com.iheart" %% "ficus" % "1.4.0"
  }

}
