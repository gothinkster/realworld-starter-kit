val tapirVersion = "1.2.7"
val zioLoggingVersion = "2.1.8"
val zioTestVersion = "2.0.6"

lazy val rootProject = (project in file(".")).settings(
  Seq(
    name := "realworld-tapir-zio",
    version := "0.1.0-SNAPSHOT",
    organization := "com.softwaremill",
    scalaVersion := "3.2.1",
    libraryDependencies ++= Seq(
      "com.softwaremill.sttp.tapir" %% "tapir-zio-http-server" % tapirVersion,
      "com.softwaremill.sttp.tapir" %% "tapir-json-zio" % tapirVersion,
      "com.softwaremill.sttp.tapir" %% "tapir-swagger-ui-bundle" % tapirVersion,
      // DB
      "org.xerial" % "sqlite-jdbc" % "3.40.0.0",
      "org.flywaydb" % "flyway-core" % "9.12.0",
      "com.zaxxer" % "HikariCP" % "5.0.1",
      "io.getquill" %% "quill-jdbc-zio" % "4.6.0",
      // Tests
      "com.softwaremill.sttp.tapir" %% "tapir-sttp-stub-server" % tapirVersion % Test,
      "dev.zio" %% "zio-logging" % zioLoggingVersion,
      "dev.zio" %% "zio-logging-slf4j" % zioLoggingVersion,
      "ch.qos.logback" % "logback-classic" % "1.4.5",
      "dev.zio" %% "zio-test" % zioTestVersion % Test,
      "dev.zio" %% "zio-test-sbt" % zioTestVersion % Test,
      "com.softwaremill.sttp.client3" %% "zio-json" % "3.8.9" % Test
    ),
    testFrameworks := Seq(new TestFramework("zio.test.sbt.ZTestFramework"))
  )
)
