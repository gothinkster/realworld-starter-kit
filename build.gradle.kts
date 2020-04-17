
plugins {
    id("org.jetbrains.dokka") version "0.10.0" apply false
    kotlin("jvm") version "1.3.71" apply false
}

defaultTasks("all")

task("clean", type = Delete::class) {
    delete("build", "log", "out")

    delete(
        fileTree(rootDir) { include("**/*.log") },
        fileTree(rootDir) { include("**/*.hprof") },
        fileTree(rootDir) { include("**/.attach_pid*") },
        fileTree(rootDir) { include("**/hs_err_pid*") }
    )
}
