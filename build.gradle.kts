
plugins {
    id("org.jetbrains.dokka") version "0.9.18" apply false
    kotlin("jvm") version "1.3.31" apply false
}

defaultTasks("all")

task("clean", type = Delete::class) {
    delete("build", "log", "out")

    delete(
        fileTree(rootDir) { include("**/*.log") },
        fileTree(rootDir) { include("**/*.hprof") }
    )
}
