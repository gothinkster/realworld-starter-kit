package com.hexagonkt.realworld.rest

import com.hexagonkt.http.client.Client
import com.hexagonkt.http.client.ClientSettings
import com.hexagonkt.http.client.ahc.AhcAdapter
import com.hexagonkt.realworld.main
import com.hexagonkt.realworld.server
import com.hexagonkt.serialization.json.Json
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
        val settings = ClientSettings(Json.contentType)
        val client = Client(AhcAdapter(), "http://localhost:${server.runtimePort}/api", settings)
        val corsHeaders = "Accept,User-Agent,Host,Content-Type"
        val response = client.options("/tags", headers = mapOf(
            "Origin" to listOf("localhost"),
            "Access-Control-Request-Headers" to listOf(corsHeaders),
            "Access-Control-Request-Method" to listOf("GET")
        ))

        assert(response.status == 204)
        assert(response.headers["Access-Control-Allow-Origin"] == listOf("localhost"))
        assert(response.headers["Access-Control-Allow-Headers"] == listOf(corsHeaders))
    }
}
