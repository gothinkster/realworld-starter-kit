
plugins {
    kotlin("jvm") version("1.7.21") apply(false)

    id("org.graalvm.buildtools.native") version("0.9.17") apply(false)
}

defaultTasks("build")

task("clean", type = Delete::class) {
    delete("build", "log", "out", "kotlin-js-store")

    delete(
        fileTree(rootDir) { include("**/*.log") },
        fileTree(rootDir) { include("**/*.hprof") },
        fileTree(rootDir) { include("**/.attach_pid*") },
        fileTree(rootDir) { include("**/hs_err_pid*") }
    )
}
