
rootProject.name = "real_world"

gradle.rootProject {

    allprojects {
        version = "0.1"
        group = "com.hexagonkt.realworld"
        description = "Real World Implementation"
    }
}

include("backend")
