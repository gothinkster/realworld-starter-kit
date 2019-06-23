/*
 * Check usage in the `README.md` file.
 * Dependencies' versions are defined in the `gradle.properties` file.
 */

plugins {
    idea
    eclipse
    application
    war
}

apply(from = "${extra["gradleScripts"]}/kotlin.gradle")
apply(from = "${extra["gradleScripts"]}/dokka.gradle")
apply(from = "${extra["gradleScripts"]}/service.gradle")

idea {
    module {
        setDownloadSources(true)
        setDownloadJavadoc(true)
    }
}

eclipse {
    classpath {
        setDownloadSources(true)
        setDownloadJavadoc(true)
    }
}

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
    implementation("com.hexagonkt:http_server_jetty:${extra["hexagonVersion"]}")
    implementation("com.hexagonkt:port_http_client:${extra["hexagonVersion"]}")

    testImplementation("junit:junit:${extra["junitVersion"]}")
    testImplementation("io.mockk:mockk:${extra["mockkVersion"]}")
    testImplementation("io.cucumber:cucumber-java8:${extra["cucumberVersion"]}")
    testImplementation("io.cucumber:cucumber-junit:${extra["cucumberVersion"]}")
}
