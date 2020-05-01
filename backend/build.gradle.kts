/*
 * Check usage in the `README.md` file.
 * Dependencies' versions are defined in the `gradle.properties` file.
 */

plugins {
    application
    war
}

extra["applicationClassName"] = "com.hexagonkt.realworld.ApplicationKt"

apply(from = "${extra["gradleScripts"]}/kotlin.gradle")
apply(from = "${extra["gradleScripts"]}/dokka.gradle")
apply(from = "${extra["gradleScripts"]}/service.gradle")
apply(from = "${extra["gradleScripts"]}/junit.gradle")

tasks.war {
    archiveFileName.set("ROOT.war")
}

task("doc") {
    dependsOn("dokka", "jacocoTestReport")
}

task("all") {
    dependsOn("installDist", "jarAll", "doc")
}

dependencies {
    implementation("com.hexagonkt:http_server_jetty:${project.extra["hexagonVersion"]}")
    implementation("com.hexagonkt:store_mongodb:${project.extra["hexagonVersion"]}")
    implementation("com.auth0:java-jwt:${project.extra["javaJwtVersion"]}")

    testImplementation("com.hexagonkt:http_client_ahc:${project.extra["hexagonVersion"]}")
    testImplementation("com.hexagonkt:port_http_server:${project.extra["hexagonVersion"]}:test")
}
