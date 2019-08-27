package com.hexagonkt.realworld.routes

import com.hexagonkt.http.client.Client
import com.hexagonkt.realworld.RealWorldClient
import com.hexagonkt.realworld.main
import com.hexagonkt.realworld.messages.PutUserRequest
import com.hexagonkt.realworld.server
import com.hexagonkt.serialization.Json
import com.hexagonkt.realworld.services.User
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.TestInstance.Lifecycle.PER_CLASS
import java.net.URL

@TestInstance(PER_CLASS)
class UserRouterIT {

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

    @Test fun `Get and update current user`() {
        val endpoint = "http://localhost:${server.runtimePort}/api"
        val client = RealWorldClient(Client(endpoint, Json.contentType))

        val jakeClient = client.initializeUser(jake)

        jakeClient.getUser(jake)
        jakeClient.updateUser(jake, PutUserRequest(email = jake.email))
        jakeClient.updateUser(jake, PutUserRequest(email = "changed.${jake.email}"))

        client.getUser(jake) {
            assert(statusCode == 401)
//            assert(contentType == "${Json.contentType};charset=utf-8") // TODO
        }
        client.updateUser(jake, PutUserRequest(email = jake.email)) {
            assert(statusCode == 401)
//            assert(contentType == "${Json.contentType};charset=utf-8") // TODO
        }
    }
}
