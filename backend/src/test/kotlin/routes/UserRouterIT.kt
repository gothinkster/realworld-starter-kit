package com.hexagonkt.realworld.routes

import com.hexagonkt.http.client.Client
import com.hexagonkt.realworld.RealWorldClient
import com.hexagonkt.realworld.main
import com.hexagonkt.realworld.server
import com.hexagonkt.serialization.Json
import com.hexagonkt.realworld.services.User
import org.junit.*
import java.net.URL

/**
 * TODO
 *   - Check 401 errors in `getUser`
 *   - Check 401 errors in `updateUser`
 */
class UserRouterIT {

    private val jake = User(
        username = "jake",
        email = "jake@jake.jake",
        password = "jakejake",
        bio = "I work at statefarm",
        image = URL("https://i.pravatar.cc/150?img=3")
    )

    companion object {
        @BeforeClass @JvmStatic fun startup() {
            main()
        }

        @AfterClass @JvmStatic fun shutdown() {
            server.stop()
        }
    }

    @Test fun `Get and update current user`() {
        val endpoint = "http://localhost:${server.runtimePort}/api"
        val client = RealWorldClient(Client(endpoint, Json.contentType))

        val jakeClient = client.initializeUser(jake)

        jakeClient.getUser(jake)
        jakeClient.updateUser(jake, PutUserRequest(email = jake.email))
        jakeClient.updateUser(jake, PutUserRequest(email = "changed.${jake.email}"))
    }
}
