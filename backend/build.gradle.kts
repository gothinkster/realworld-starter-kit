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
    val javaJwtVersion = properties["javaJwtVersion"]

    "implementation"("com.hexagonkt:serialization_jackson_yaml:${properties["hexagonVersion"]}")
    "implementation"("com.hexagonkt:http_server_jetty:$hexagonVersion")
    "implementation"("com.hexagonkt:logging_slf4j_jul:$hexagonVersion")
    "implementation"("com.hexagonkt:serialization_jackson_json:$hexagonVersion")
    "implementation"("com.hexagonkt:store_mongodb:$hexagonVersion")
    "implementation"("com.auth0:java-jwt:$javaJwtVersion")

    "testImplementation"("com.hexagonkt:http_client_ahc:$hexagonVersion")
}
