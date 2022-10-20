package com.hexagonkt.realworld

import com.hexagonkt.http.client.HttpClient
import com.hexagonkt.http.client.jetty.JettyClientAdapter
import com.hexagonkt.realworld.routes.it.mongodbUrl
import org.eclipse.jetty.server.Server
import org.eclipse.jetty.webapp.WebAppContext
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import java.net.InetSocketAddress
import java.net.URL
import kotlin.test.assertEquals

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
        System.setProperty("mongodbUrl", mongodbUrl)

        val context = WebAppContext()
        context.contextPath = "/api"
        context.war = "."
        context.addEventListener(WebApplication())

        jettyServer.handler = context
        jettyServer.start()
    }

    @Test fun `Servlet server starts`() {
        val response = HttpClient(JettyClientAdapter(), URL("http://$hostname:$port/api")).use {
            it.start()
            it.get("/articles")
        }
        assertEquals(200, response.status.code)
    }
}
