package com.hexagonkt.realworld.routes.it

import com.hexagonkt.core.media.ApplicationMedia
import com.hexagonkt.http.client.HttpClient
import com.hexagonkt.http.client.HttpClientSettings
import com.hexagonkt.http.client.jetty.JettyClientAdapter
import com.hexagonkt.http.model.ContentType
import com.hexagonkt.http.model.Header
import com.hexagonkt.http.model.Headers
import com.hexagonkt.realworld.main
import com.hexagonkt.realworld.server
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import java.net.URL
import kotlin.test.assertEquals

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class CorsIT {

    @BeforeAll
    fun startup() {
        System.setProperty("mongodbUrl", mongodbUrl)

        main()
    }

    @AfterAll
    fun shutdown() {
        server.stop()
    }

    @Test
    fun `OPTIONS returns correct CORS headers`() {
        val settings = HttpClientSettings(contentType = ContentType(ApplicationMedia.JSON))
        val baseUrl = URL("http://localhost:${server.runtimePort}/api")
        val client = HttpClient(JettyClientAdapter(), baseUrl, settings)
        client.start()
        val corsHeaders = "accept,user-agent,host,content-type"
        val response = client.options("/tags", headers = Headers(
            Header("origin", "localhost"),
            Header("access-control-request-headers", corsHeaders),
            Header("access-control-request-method", "GET"),
        )
        )

        assertEquals(204, response.status.code)
        assertEquals(corsHeaders, response.headers["access-control-allow-headers"]?.value)
        assertEquals("localhost", response.headers["access-control-allow-origin"]?.value)
    }
}
