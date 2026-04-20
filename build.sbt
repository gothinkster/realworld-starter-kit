val projectName = "realworld-conduit-backend"
val isRunningInCi = sys.env.get("CI").contains("true")

ThisBuild / tpolecatDefaultOptionsMode := {
  if (isRunningInCi)
    org.typelevel.sbt.tpolecat.CiMode
  else
    org.typelevel.sbt.tpolecat.DevMode
}
// Workaround for https://github.com/typelevel/sbt-tpolecat/issues/291
ThisBuild / tpolecatExcludeOptions += org.typelevel.scalacoptions.ScalacOptions.fatalWarnings
ThisBuild / organization := "com.example.realworld"
ThisBuild / organizationName := "Example"
ThisBuild / version := sys.env.getOrElse("PROJECT_VERSION", "0.0.0-LOCAL-SNAPSHOT")
ThisBuild / scalaVersion := "3.8.3"
ThisBuild / semanticdbEnabled := true
ThisBuild / semanticdbVersion := scalafixSemanticdb.revision

val catsVersion = "2.13.0"
val catsEffectVersion = "3.7.0"
val fs2Version = "3.13.0"
val http4sVersion = "0.23.33"
val log4j2Version = "2.25.4"
val openTelemetryVersion = "1.57.0"
val openTelemetryInstrumentationVersion = "2.23.0"
val otel4sVersion = "0.15.0"
val otel4sDoobieVersion = "0.11.0"
val pureconfigVersion = "0.17.10"
val tapirVersion = "1.13.6"
val jsoniterScalaVersion = "2.38.9"
val doobieVersion = "1.0.0-RC11"
val postgresVersion = "42.7.10"
val jwtScalaVersion = "11.0.4"
val munitVersion = "1.3.0"
val munitCatsEffectVersion = "2.2.0"
val testcontainersScalaVersion = "0.44.1"

lazy val log4j2Bom = com.here.bom.Bom(
  "org.apache.logging.log4j" % "log4j-bom" % log4j2Version
)
lazy val openTelemetryBom = com.here.bom.Bom(
  "io.opentelemetry" % "opentelemetry-bom-alpha" % s"$openTelemetryVersion-alpha"
)
lazy val openTelemetryInstrumentationBomAlpha = com.here.bom.Bom(
  "io.opentelemetry.instrumentation" % "opentelemetry-instrumentation-bom-alpha" % s"$openTelemetryInstrumentationVersion-alpha"
)

val jvmOptions = List(
  "-Dcats.effect.trackFiberContext=true",
  "-Djava.util.logging.manager=org.apache.logging.log4j.jul.LogManager"
)

val scalaCompilerOptions = Seq(
  "-Wsafe-init",
  "-Wunused:all",
  "-Xmax-inlines:64",
  "-source:3.7-migration"
) ++ (
  // Workaround for https://github.com/typelevel/sbt-tpolecat/issues/291
  if (isRunningInCi)
    Seq("-Werror")
  else
    Seq.empty
)

lazy val app = (project in file("app"))
  .settings(
    log4j2Bom,
    openTelemetryBom,
    openTelemetryInstrumentationBomAlpha
  )
  .settings(
    libraryDependencies ++= Seq(
      "co.fs2" %% "fs2-core" % fs2Version,
      "co.fs2" %% "fs2-io" % fs2Version,
      "com.github.jwt-scala" %% "jwt-core" % jwtScalaVersion,
      "com.github.plokhotnyuk.jsoniter-scala" %% "jsoniter-scala-core" % jsoniterScalaVersion,
      "com.github.plokhotnyuk.jsoniter-scala" %% "jsoniter-scala-macros" % jsoniterScalaVersion,
      "com.github.pureconfig" %% "pureconfig-cats-effect" % pureconfigVersion,
      "com.github.pureconfig" %% "pureconfig-core" % pureconfigVersion,
      "com.github.pureconfig" %% "pureconfig-generic-scala3" % pureconfigVersion,
      "com.softwaremill.sttp.tapir" %% "tapir-core" % tapirVersion,
      "com.softwaremill.sttp.tapir" %% "tapir-http4s-server" % tapirVersion,
      "com.softwaremill.sttp.tapir" %% "tapir-jsoniter-scala" % tapirVersion,
      "com.softwaremill.sttp.tapir" %% "tapir-otel4s-metrics" % tapirVersion,
      "com.softwaremill.sttp.tapir" %% "tapir-otel4s-tracing" % tapirVersion,
      "com.softwaremill.sttp.tapir" %% "tapir-swagger-ui-bundle" % tapirVersion,
      "io.github.arturaz" %% "otel4s-doobie" % otel4sDoobieVersion,
      "io.opentelemetry" % "opentelemetry-exporter-otlp" % openTelemetryBom.key.value % Runtime,
      "io.opentelemetry.instrumentation" % "opentelemetry-hikaricp-3.0" % openTelemetryInstrumentationBomAlpha.key.value,
      "io.opentelemetry.instrumentation" % "opentelemetry-log4j-appender-2.17" % openTelemetryInstrumentationBomAlpha.key.value,
      "io.opentelemetry.instrumentation" % "opentelemetry-runtime-telemetry-java17" % openTelemetryInstrumentationBomAlpha.key.value,
      "org.apache.logging.log4j" % "log4j-core" % log4j2Bom.key.value,
      "org.apache.logging.log4j" % "log4j-jul" % log4j2Bom.key.value % Runtime,
      "org.apache.logging.log4j" % "log4j-slf4j2-impl" % log4j2Bom.key.value % Runtime,
      "org.http4s" %% "http4s-ember-server" % http4sVersion,
      "org.postgresql" % "postgresql" % postgresVersion % Runtime,
      "org.scalameta" %% "munit" % munitVersion % Test,
      "org.tpolecat" %% "doobie-core" % doobieVersion,
      "org.tpolecat" %% "doobie-hikari" % doobieVersion,
      "org.tpolecat" %% "doobie-munit" % doobieVersion % Test,
      "org.tpolecat" %% "doobie-postgres" % doobieVersion,
      "org.typelevel" %% "cats-core" % catsVersion,
      "org.typelevel" %% "cats-effect" % catsEffectVersion,
      "org.typelevel" %% "munit-cats-effect" % munitCatsEffectVersion % Test,
      "org.typelevel" %% "otel4s-oteljava" % otel4sVersion,
      "org.typelevel" %% "otel4s-oteljava-context-storage" % otel4sVersion
    ),
    dependencyOverrides ++= log4j2Bom.key.value.bomDependencies ++
      openTelemetryBom.key.value.bomDependencies ++
      openTelemetryInstrumentationBomAlpha.key.value.bomDependencies,
    Compile / run / fork := true,
    Test / fork := true,
    javaOptions ++= jvmOptions,
    jibJvmFlags := jvmOptions,
    jibBaseImage := "docker.io/library/eclipse-temurin:21-jre-alpine",
    jibName := projectName,
    jibTags += "latest",
    testFrameworks += new TestFramework("munit.Framework"),
    scalacOptions ++= scalaCompilerOptions
  )

lazy val integration = (project in file("integration"))
  .dependsOn(app % "compile->compile;test->test;runtime->runtime")
  .settings(
    log4j2Bom,
    openTelemetryBom,
    openTelemetryInstrumentationBomAlpha
  )
  .settings(
    publish / skip := true,
    libraryDependencies ++= Seq(
      "com.dimafeng" %% "testcontainers-scala-munit" % testcontainersScalaVersion % Test,
      "com.dimafeng" %% "testcontainers-scala-postgresql" % testcontainersScalaVersion % Test
    ),
    dependencyOverrides ++= log4j2Bom.key.value.bomDependencies ++
      openTelemetryBom.key.value.bomDependencies ++
      openTelemetryInstrumentationBomAlpha.key.value.bomDependencies,
    Compile / run / fork := true,
    Test / fork := true,
    javaOptions ++= jvmOptions,
    testFrameworks += new TestFramework("munit.Framework"),
    scalacOptions ++= scalaCompilerOptions
  )

lazy val root = (project in file("."))
  .aggregate(app, integration)
  .settings(
    name := projectName
  )
