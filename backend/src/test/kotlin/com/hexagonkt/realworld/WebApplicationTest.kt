package com.hexagonkt.realworld

import com.hexagonkt.http.client.Client
import com.hexagonkt.http.client.ahc.AhcAdapter
import org.eclipse.jetty.server.Server
import org.eclipse.jetty.webapp.WebAppContext
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import java.net.InetSocketAddress

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class WebApplicationTest {

    private val hostname = "127.0.0.1"
    private val port = 9897
    private val jettyServer = Server(InetSocketAddress(hostname, port))

    @AfterAll fun shutdown() {
        jettyServer.stopAtShutdown = true
        jettyServer.stop()
    }

    @BeforeAll fun startServer() {
        System.setProperty("keyStoreResource", "classpath:keystore.p12")
        System.setProperty("keyStorePassword", "storepass")
        System.setProperty("keyPairAlias", "realWorld")
        System.setProperty("mongodbUrl", "mongodb://localhost:3010/real_world")

        val context = WebAppContext()
        context.contextPath = "/api"
        context.war = "."
        context.addEventListener(WebApplication())

        jettyServer.handler = context
        jettyServer.start()
    }

    @Test fun `Servlet server starts`() {
        val response = Client(AhcAdapter(), "http://$hostname:$port/api").get("/articles")
        assert(response.status == 200)
    }
}
