import org.graalvm.buildtools.gradle.dsl.GraalVMExtension

/*
 * Check usage in the `README.md` file.
 * Dependencies' versions are defined in the `gradle.properties` file.
 */

plugins {
    application
    war
}

apply(from = "${properties["gradleScripts"]}/kotlin.gradle")
apply(from = "${properties["gradleScripts"]}/application.gradle")
apply(from = "${properties["gradleScripts"]}/native.gradle")

extensions.configure<JavaApplication> {
    mainClass.set("com.hexagonkt.realworld.ApplicationKt")
}

tasks.named<War>("war") {
    archiveFileName.set("ROOT.war")
}

tasks.named("assemble") {
    dependsOn("installDist")
}

dependencies {
    val hexagonVersion = properties["hexagonVersion"]
    val hexagonExtraVersion = properties["hexagonExtraVersion"]
    val javaJwtVersion = properties["javaJwtVersion"]
    val testcontainersVersion = properties["testcontainersVersion"]

    "implementation"("com.hexagonkt:rest:$hexagonExtraVersion")
    "implementation"("com.hexagonkt:serialization_jackson_json:$hexagonVersion")
    "implementation"("com.hexagonkt:http_server_jetty:$hexagonVersion")
    "implementation"("com.hexagonkt:logging_slf4j_jul:$hexagonVersion")
    "implementation"("com.hexagonkt:store_mongodb:$hexagonExtraVersion")
    "implementation"("com.auth0:java-jwt:$javaJwtVersion")

    "testImplementation"("com.hexagonkt:http_client_jetty:$hexagonVersion")
    "testImplementation"("org.testcontainers:mongodb:$testcontainersVersion")
}

extensions.configure<GraalVMExtension> {
    binaries {
        named("main") {
            configurationFileDirectories.from(file("build/native/agent-output/verify"))
            listOf(
                "--enable-http",
                "--enable-https",
                "--enable-url-protocols=classpath",
                "--initialize-at-build-time=com.hexagonkt.core.ClasspathHandler",
                "--report-unsupported-elements-at-runtime",
                "-H:+StaticExecutableWithDynamicLibC",
                "-H:IncludeResources=.*\\.p12",
            )
            .forEach(buildArgs::add)
        }
    }

}
