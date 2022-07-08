package com.hexagonkt.realworld.routes.it

import com.hexagonkt.core.media.ApplicationMedia
import com.hexagonkt.core.requireKeys
import com.hexagonkt.http.client.HttpClient
import com.hexagonkt.http.client.HttpClientSettings
import com.hexagonkt.http.client.jetty.JettyClientAdapter
import com.hexagonkt.http.model.ContentType
import com.hexagonkt.http.model.ServerErrorStatus.INTERNAL_SERVER_ERROR
import com.hexagonkt.realworld.RealWorldClient
import com.hexagonkt.realworld.main
import com.hexagonkt.realworld.messages.ErrorResponse
import com.hexagonkt.realworld.server
import com.hexagonkt.realworld.services.User
import com.hexagonkt.rest.bodyMap
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.TestInstance.Lifecycle.PER_CLASS
import java.net.URL
import kotlin.text.Charsets.UTF_8

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
        val endpoint = URL("http://localhost:${server.runtimePort}/api")
        val settings = HttpClientSettings(endpoint, ContentType(ApplicationMedia.JSON))
        val client = RealWorldClient(HttpClient(JettyClientAdapter(), settings))

        client.deleteUser(jake)
        client.deleteUser(jake, setOf(404))
        client.registerUser(jake)
        client.registerUser(jake) {
            assert(status == INTERNAL_SERVER_ERROR)
            assert(contentType == ContentType(ApplicationMedia.JSON, charset = UTF_8))

            val errors = ErrorResponse(bodyMap().requireKeys("errors", "body"))
            val exceptionName = "MongoWriteException"
            val message = "E11000 duplicate key error collection: real_world.User index"
            val key = """_id_ dup key: { _id: "${jake.username}" }"""
            assert(errors.body.first() == "$exceptionName: $message: $key")
        }

        client.loginUser(jake)
        client.loginUser(jake) // Login ok two times in a row should work
    }
}
