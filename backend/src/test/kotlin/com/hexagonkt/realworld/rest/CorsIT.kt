package com.hexagonkt.realworld.rest

import com.hexagonkt.http.client.Client
import com.hexagonkt.realworld.main
import com.hexagonkt.realworld.server
import com.hexagonkt.serialization.Json
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.TestInstance.Lifecycle.PER_CLASS

@TestInstance(PER_CLASS)
class CorsIT {

    @BeforeAll fun startup() {
        main()
    }

    @AfterAll fun shutdown() {
        server.stop()
    }

    @Test fun `OPTIONS returns correct CORS headers`() {
        val client = Client("http://localhost:${server.runtimePort}/api", Json.contentType)
        val corsHeaders = "Accept,User-Agent,Host,Content-Type"
        val response = client.options("/tags", callHeaders = mapOf(
            "Origin" to listOf("localhost"),
            "Access-Control-Request-Headers" to listOf(corsHeaders),
            "Access-Control-Request-Method" to listOf("GET")
        ))

        assert(response.statusCode == 204)
        assert(response.headers["Access-Control-Allow-Origin"] == "localhost")
        assert(response.headers["Access-Control-Allow-Headers"] == corsHeaders)
    }
}
