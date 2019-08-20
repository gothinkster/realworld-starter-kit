package com.hexagonkt.realworld.routes

import com.hexagonkt.http.client.Client
import com.hexagonkt.realworld.RealWorldClient
import com.hexagonkt.realworld.main
import com.hexagonkt.realworld.server
import com.hexagonkt.serialization.Json
import com.hexagonkt.realworld.services.User
import org.junit.*
import java.net.URL

class ProfilesRouterIT {

    private val jake = User(
        username = "jake",
        email = "jake@jake.jake",
        password = "jakejake",
        bio = "I work at statefarm",
        image = URL("https://i.pravatar.cc/150?img=3")
    )

    private val jane = User(
        username = "jane",
        email = "jane@jane.jane",
        password = "janejane",
        bio = "I own MegaCloud",
        image = URL("https://i.pravatar.cc/150?img=1")
    )

    companion object {
        @BeforeClass @JvmStatic fun startup() {
            main()
        }

        @AfterClass @JvmStatic fun shutdown() {
            server.stop()
        }
    }

    @Test fun `Follow and unfollow a profile`() {
        val endpoint = "http://localhost:${server.runtimePort}/api"
        val client = RealWorldClient(Client(endpoint, Json.contentType))

        val jakeClient = client.initializeUser(jake)
        val janeClient = client.initializeUser(jane)

        jakeClient.getProfile(jane, false)
        jakeClient.followProfile(jane, true)
        jakeClient.getProfile(jane, true)
        jakeClient.followProfile(jane, false)
        jakeClient.getProfile(jane, false)

        janeClient.getProfile(jake, false)
        janeClient.followProfile(jake, true)
        janeClient.getProfile(jake, true)
        janeClient.followProfile(jake, false)
        janeClient.getProfile(jake, false)
    }
}
