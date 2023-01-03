
plugins {
    application
    war
}

apply(from = "${properties["gradleScripts"]}/kotlin.gradle")
apply(from = "${properties["gradleScripts"]}/application.gradle")

extensions.configure<JavaApplication> {
    mainClass.set("com.hexagonkt.realworld.ApplicationKt")
}

tasks.named("assemble") {
    dependsOn("installDist")
}

dependencies {
    val hexagonVersion = properties["hexagonVersion"]
    val hexagonExtraVersion = properties["hexagonExtraVersion"]
    val javaJwtVersion = properties["javaJwtVersion"]
    val testcontainersVersion = properties["testcontainersVersion"]

    "implementation"("com.hexagonkt:serialization_jackson_json:$hexagonVersion")
    "implementation"("com.hexagonkt:http_server_jetty:$hexagonVersion")
    "implementation"("com.hexagonkt:logging_slf4j_jul:$hexagonVersion")
    "implementation"("com.hexagonkt.extra:rest:$hexagonExtraVersion")
    "implementation"("com.hexagonkt.extra:converters:$hexagonExtraVersion")
    "implementation"("com.hexagonkt.extra:store_mongodb:$hexagonExtraVersion")
    "implementation"("com.auth0:java-jwt:$javaJwtVersion")

    "testImplementation"("com.hexagonkt:http_client_jetty:$hexagonVersion")
    "testImplementation"("org.testcontainers:mongodb:$testcontainersVersion")
}
