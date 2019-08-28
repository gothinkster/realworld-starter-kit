
rootProject.name = "real_world"

gradle.rootProject {

    allprojects {
        version = "1.0"
        group = "com.hexagonkt.realworld"
        description = "Real World Implementation"
    }
}

include("backend", "frontend")
