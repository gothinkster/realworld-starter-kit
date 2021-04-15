
import org.jetbrains.kotlin.gradle.dsl.KotlinJsProjectExtension

plugins {
    kotlin("js")
}

extensions.configure<KotlinJsProjectExtension> {

    sourceSets {
        listOf("main", "test").forEach {
            getByName(it) {
                kotlin.srcDir(file(name))
                resources.srcDir(file(name))
                resources.exclude("js", "**/*.kt", "**/*.java")
            }
        }
    }

    js {
        binaries.executable()

        browser {
            webpackTask {
                cssSupport.enabled = true
            }

            runTask {
                cssSupport.enabled = true
            }

            testTask {
                useKarma {
                    useChromeHeadless()
                    webpackConfig.cssSupport.enabled = true
                }
            }
        }
    }
}

repositories {
    mavenCentral()
    jcenter()
    maven("https://dl.bintray.com/kotlin/kotlinx")
}

dependencies {
    "implementation"("org.jetbrains.kotlinx:kotlinx-html-js:${project.extra["kotlinxHtmlVersion"]}")
}
