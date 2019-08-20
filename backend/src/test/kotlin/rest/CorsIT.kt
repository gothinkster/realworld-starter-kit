package com.hexagonkt.realworld.rest

import com.hexagonkt.http.client.Client
import com.hexagonkt.realworld.main
import com.hexagonkt.realworld.server
import com.hexagonkt.serialization.Json
import org.junit.*

class CorsIT {

    companion object {
        @BeforeClass @JvmStatic fun startup() {
            main()
        }

        @AfterClass @JvmStatic fun shutdown() {
            server.stop()
        }
    }

    @Test fun `OPTIONS returns correct CORS headers`() {
        val client = Client("http://localhost:${server.runtimePort}/api", Json.contentType)
        val response = client.options("/tags")
        val corsHeaders = "Accept,User-Agent,Host,Content-Type"

        assert(response.statusCode == 204)
        assert(response.headers["Access-Control-Allow-Origin"] == "*")
        assert(response.headers["Access-Control-Allow-Headers"] == corsHeaders)
    }
}
