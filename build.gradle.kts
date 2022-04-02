
plugins {
    kotlin("jvm") version("1.6.10") apply(false)
}

defaultTasks("build")

//task("clean", type = Delete::class) {
//    delete("build", "log", "out")
//
//    delete(
//        fileTree(rootDir) { include("**/*.log") },
//        fileTree(rootDir) { include("**/*.hprof") },
//        fileTree(rootDir) { include("**/.attach_pid*") },
//        fileTree(rootDir) { include("**/hs_err_pid*") }
//    )
//}
