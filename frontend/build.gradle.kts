
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
                resources.exclude("**/*.kt", "**/*.java")
            }
        }
    }

    js(IR) {
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
}

dependencies {
    val kotlinxHtmlVersion = properties["kotlinxHtmlVersion"]

    implementation("org.jetbrains.kotlinx:kotlinx-html-js:$kotlinxHtmlVersion")
    testImplementation(kotlin("test"))
}
