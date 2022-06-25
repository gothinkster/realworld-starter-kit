package com.hexagonkt.realworld.rest

import com.hexagonkt.core.media.ApplicationMedia.JSON
import com.hexagonkt.http.client.HttpClient
import com.hexagonkt.http.client.HttpClientSettings
import com.hexagonkt.http.client.jetty.JettyClientAdapter
import com.hexagonkt.http.model.ContentType
import com.hexagonkt.http.model.Header
import com.hexagonkt.http.model.HttpFields
import com.hexagonkt.realworld.main
import com.hexagonkt.realworld.server
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.TestInstance.Lifecycle.PER_CLASS
import java.net.URL

@TestInstance(PER_CLASS)
class CorsIT {

    @BeforeAll fun startup() {
        main()
    }

    @AfterAll fun shutdown() {
        server.stop()
    }

    @Test fun `OPTIONS returns correct CORS headers`() {
        val settings = HttpClientSettings(contentType = ContentType(JSON))
        val client = HttpClient(JettyClientAdapter(), URL("http://localhost:${server.runtimePort}/api"), settings)
        val corsHeaders = "Accept,User-Agent,Host,Content-Type"
        val response = client.options("/tags", headers = HttpFields(
            Header("Origin", "localhost"),
            Header("Access-Control-Request-Headers", corsHeaders),
            Header("Access-Control-Request-Method", "GET"),
        )
        )

        assert(response.status.code == 204)
        assert(response.headers["Access-Control-Allow-Origin"] == "localhost")
        assert(response.headers["Access-Control-Allow-Headers"] == corsHeaders)
    }
}
