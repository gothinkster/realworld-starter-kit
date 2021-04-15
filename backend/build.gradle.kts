/*
 * Check usage in the `README.md` file.
 * Dependencies' versions are defined in the `gradle.properties` file.
 */

plugins {
    application
    war
}

apply(from = "${properties["gradleScripts"]}/kotlin.gradle")
apply(from = "${properties["gradleScripts"]}/dokka.gradle")
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
    "implementation"("com.hexagonkt:hexagon_settings:${properties["hexagonVersion"]}")
    "implementation"("com.hexagonkt:http_server_jetty:${properties["hexagonVersion"]}")
    "implementation"("com.hexagonkt:store_mongodb:${properties["hexagonVersion"]}")
    "implementation"("com.auth0:java-jwt:${properties["javaJwtVersion"]}")

    "testImplementation"("com.hexagonkt:http_client_ahc:${properties["hexagonVersion"]}")
    "testImplementation"("com.hexagonkt:port_http_server:${properties["hexagonVersion"]}:test")
}
