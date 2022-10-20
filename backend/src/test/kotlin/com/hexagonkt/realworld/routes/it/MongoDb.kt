package com.hexagonkt.realworld.routes.it

import org.testcontainers.containers.MongoDBContainer

private val mongoDb: MongoDBContainer = MongoDBContainer("mongo:5.0-focal")
    .withExposedPorts(27017)
    .apply { start() }

internal val mongodbUrl by lazy {
    "mongodb://localhost:${mongoDb.getMappedPort(27017)}/real_world"
}
