/*
 * Check usage in the `README.md` file.
 * Dependencies' versions are defined in the `gradle.properties` file.
 */

plugins {
    application
    war
}

apply(from = "${extra["gradleScripts"]}/kotlin.gradle")
apply(from = "${extra["gradleScripts"]}/dokka.gradle")
apply(from = "${extra["gradleScripts"]}/service.gradle")

application {
    mainClassName = "com.hexagonkt.realworld.ApplicationKt"
    applicationDefaultJvmArgs = listOf("-XX:+UseNUMA", "-XX:+UseParallelGC", "-XX:+AggressiveOpts")
}

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
    implementation("com.hexagonkt:port_http_client:${project.extra["hexagonVersion"]}")
    implementation("com.hexagonkt:store_mongodb:${project.extra["hexagonVersion"]}")
    implementation("io.jsonwebtoken:jjwt-impl:${project.extra["jjwtVersion"]}")
    implementation("com.auth0:java-jwt:3.8.1")

    testImplementation("junit:junit:${project.extra["junitVersion"]}")
    testImplementation("io.mockk:mockk:${project.extra["mockkVersion"]}")
    testImplementation("io.cucumber:cucumber-java8:${project.extra["cucumberVersion"]}")
    testImplementation("io.cucumber:cucumber-junit:${project.extra["cucumberVersion"]}")
}
