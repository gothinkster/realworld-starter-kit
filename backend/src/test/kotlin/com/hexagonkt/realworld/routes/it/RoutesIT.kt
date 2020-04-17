package com.hexagonkt.realworld.routes.it

import com.hexagonkt.http.client.Client
import com.hexagonkt.http.client.ClientSettings
import com.hexagonkt.http.client.ahc.AhcAdapter
import com.hexagonkt.realworld.RealWorldClient
import com.hexagonkt.realworld.main
import com.hexagonkt.realworld.server
import com.hexagonkt.serialization.Json
import com.hexagonkt.realworld.services.User
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.TestInstance.Lifecycle.PER_CLASS
import java.net.URL

/**
 * TODO Test bad requests (invalid JSON, bad field formats, etc.)
 */
@TestInstance(PER_CLASS)
class RoutesIT {

    private val jake = User(
        username = "jake",
        email = "jake@jake.jake",
        password = "jakejake",
        bio = "I work at statefarm",
        image = URL("https://i.pravatar.cc/150?img=3")
    )

    @BeforeAll fun startup() {
        main()
    }

    @AfterAll fun shutdown() {
        server.stop()
    }

    @Test fun `Non existing route returns a 404`() {
        val endpoint = "http://localhost:${server.runtimePort}/api"
        val settings = ClientSettings(Json.contentType)
        val client = RealWorldClient(Client(AhcAdapter(), endpoint, settings))

        val jakeClient = client.initializeUser(jake)

        jakeClient.client.get("/404").apply { assert(status == 404) }
    }
}
