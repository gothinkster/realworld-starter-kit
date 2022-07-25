package com.hexagonkt.realworld.routes.it

import com.hexagonkt.core.media.ApplicationMedia
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
import java.net.URL
import kotlin.test.assertEquals

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class CorsIT {

    @BeforeAll
    fun startup() {
        System.setProperty("keyStoreResource", "classpath:keystore.p12")
        System.setProperty("keyStorePassword", "storepass")
        System.setProperty("keyPairAlias", "realWorld")
        System.setProperty("mongodbUrl", "mongodb://localhost:3010/real_world")

        main()
    }

    @AfterAll
    fun shutdown() {
        server.stop()
    }

    @Test
    fun `OPTIONS returns correct CORS headers`() {
        val settings = HttpClientSettings(contentType = ContentType(ApplicationMedia.JSON))
        val client = HttpClient(JettyClientAdapter(), URL("http://localhost:${server.runtimePort}/api"), settings)
        client.start()
        val corsHeaders = "Accept,User-Agent,Host,Content-Type"
        val response = client.options("/tags", headers = HttpFields(
            Header("origin", "localhost"),
            Header("access-control-request-headers", corsHeaders),
            Header("access-control-request-method", "GET"),
        )
        )

        assertEquals(204, response.status.code)
        assertEquals(corsHeaders, response.headers["access-control-allow-headers"])
        assertEquals("localhost", response.headers["access-control-allow-origin"])
    }
}
