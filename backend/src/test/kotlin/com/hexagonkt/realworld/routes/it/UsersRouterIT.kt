package com.hexagonkt.realworld.routes.it

import com.hexagonkt.http.client.Client
import com.hexagonkt.http.client.ClientSettings
import com.hexagonkt.http.client.ahc.AhcAdapter
import com.hexagonkt.realworld.RealWorldClient
import com.hexagonkt.realworld.main
import com.hexagonkt.realworld.messages.ErrorResponseRoot
import com.hexagonkt.realworld.server
import com.hexagonkt.serialization.json.Json
import com.hexagonkt.realworld.services.User
import com.hexagonkt.serialization.parse
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.TestInstance.Lifecycle.PER_CLASS
import java.net.URL

/**
 * TODO
 *   - Login without credentials
 *   - Login with bad password
 */
@TestInstance(PER_CLASS)
class UsersRouterIT {

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

    @Test fun `Delete, login and register users`() {
        val endpoint = "http://localhost:${server.runtimePort}/api"
        val settings = ClientSettings(Json.contentType)
        val client = RealWorldClient(Client(AhcAdapter(), endpoint, settings))

        client.deleteUser(jake)
        client.deleteUser(jake, setOf(404))
        client.registerUser(jake)
        client.registerUser(jake) {
            assert(status == 500)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val errorResponse = body?.parse(ErrorResponseRoot::class) ?: error("Body expected")
            val exceptionName = "MongoWriteException"
            val message = "E11000 duplicate key error collection: real_world.User index"
            val key = """_id_ dup key: { _id: "${jake.username}" }"""
            assert(errorResponse.errors.body.first() == "$exceptionName: $message: $key")
        }

        client.loginUser(jake)
        client.loginUser(jake) // Login ok two times in a row should work
    }
}
