
//apply(plugin = "kotlin2js")
plugins {
    idea
    eclipse
    id("kotlin2js")
}

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

dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-html-js:${extra["kotlinxHtmlVersion"]}")
}

apply(from = "${extra["gradleScripts"]}/kotlin_js.gradle")

task("all") {
    dependsOn("assemble")
}
