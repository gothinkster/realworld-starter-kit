val tapirVersion = "1.2.8" // TODO: after upgrade to 1.2.10 application stops working
val zioLoggingVersion = "2.1.9"
val zioConfigVersion = "3.0.7"
val zioTestVersion = "2.0.10"

lazy val rootProject = (project in file(".")).settings(
  Seq(
    name := "realworld-tapir-zio",
    version := "0.1.0-SNAPSHOT",
    organization := "com.softwaremill",
    scalaVersion := "3.2.1",
    scalacOptions ++= Seq(
      "-Xmax-inlines", "64"
    ),
    libraryDependencies ++= Seq(
      // API
      "com.softwaremill.sttp.tapir" %% "tapir-zio-http-server" % tapirVersion,
      "com.softwaremill.sttp.tapir" %% "tapir-json-zio" % tapirVersion,
      "com.softwaremill.sttp.tapir" %% "tapir-swagger-ui-bundle" % tapirVersion,
      // Config
      "dev.zio" %% "zio-config-typesafe" % zioConfigVersion,
      "dev.zio" %% "zio-config-magnolia" % zioConfigVersion,
      // Security
      "com.password4j" % "password4j" % "1.7.0",
      "com.auth0" % "java-jwt" % "4.3.0",
      // DB
      "org.xerial" % "sqlite-jdbc" % "3.40.1.0",
      "org.flywaydb" % "flyway-core" % "9.15.2",
      "com.zaxxer" % "HikariCP" % "5.0.1",
      "io.getquill" %% "quill-jdbc-zio" % "4.6.0.1",
      // Tests
      "com.softwaremill.diffx" %% "diffx-core" % "0.8.2",
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
