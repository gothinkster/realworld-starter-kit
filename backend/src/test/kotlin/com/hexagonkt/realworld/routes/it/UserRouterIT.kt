package com.hexagonkt.realworld.routes.it

import com.hexagonkt.core.media.ApplicationMedia
import com.hexagonkt.core.requireKeys
import com.hexagonkt.http.client.HttpClient
import com.hexagonkt.http.client.HttpClientSettings
import com.hexagonkt.http.client.jetty.JettyClientAdapter
import com.hexagonkt.http.model.ClientErrorStatus.UNAUTHORIZED
import com.hexagonkt.http.model.ContentType
import com.hexagonkt.realworld.RealWorldClient
import com.hexagonkt.realworld.main
import com.hexagonkt.realworld.messages.ErrorResponse
import com.hexagonkt.realworld.messages.PutUserRequest
import com.hexagonkt.realworld.server
import com.hexagonkt.realworld.services.User
import com.hexagonkt.rest.bodyMap
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.TestInstance.Lifecycle.PER_CLASS
import java.net.URL
import kotlin.test.assertEquals

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
        System.setProperty("keyStoreResource", "classpath:keystore.p12")
        System.setProperty("keyStorePassword", "storepass")
        System.setProperty("keyPairAlias", "realWorld")
        System.setProperty("mongodbUrl", "mongodb://localhost:3010/real_world")

        main()
    }

    @AfterAll fun shutdown() {
        server.stop()
    }

    @Test fun `Get and update current user`() {
        val endpoint = URL("http://localhost:${server.runtimePort}/api")
        val settings = HttpClientSettings(endpoint, ContentType(ApplicationMedia.JSON))
        val client = RealWorldClient(HttpClient(JettyClientAdapter(), settings))

        val jakeClient = client.initializeUser(jake)

        jakeClient.getUser(jake)
        jakeClient.updateUser(jake, PutUserRequest(email = jake.email))
        jakeClient.updateUser(jake, PutUserRequest(email = "changed.${jake.email}"))

        client.getUser(jake) {
            val errors = ErrorResponse(bodyMap().requireKeys("errors", "body"))
            assertEquals(UNAUTHORIZED, status)
            assertEquals(ContentType(ApplicationMedia.JSON, charset = Charsets.UTF_8), contentType)
            assert(errors.body.isNotEmpty())
            assertEquals("Unauthorized", errors.body.first())
        }

        client.updateUser(jake, PutUserRequest(email = jake.email)) {
            val errors = ErrorResponse(bodyMap().requireKeys("errors", "body"))
            assertEquals(UNAUTHORIZED, status)
            assertEquals(ContentType(ApplicationMedia.JSON, charset = Charsets.UTF_8), contentType)
            assert(errors.body.isNotEmpty())
        }
    }
}
