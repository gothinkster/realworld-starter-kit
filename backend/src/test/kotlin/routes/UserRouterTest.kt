package com.hexagonkt.realworld.routes

import com.hexagonkt.http.server.Call
import com.hexagonkt.realworld.injector
import com.hexagonkt.realworld.messages.PutUserRequest
import com.hexagonkt.realworld.messages.PutUserRequestRoot
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.services.User
import com.hexagonkt.serialization.Json
import com.hexagonkt.serialization.convertToMap
import com.hexagonkt.serialization.serialize
import com.hexagonkt.store.Store
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Test

class UserRouterTest {

    @Test fun `Not updated user returns a 500 error`() {
        val jwt = injector.inject<Jwt>()
        val call = mockk<Call>()
        every { call.attributes } returns mutableMapOf("principal" to jwt.sign("john"))
        val putUserRequestRoot = PutUserRequestRoot(PutUserRequest())
        every { call.request.body } returns putUserRequestRoot.serialize(Json)
        every { call.request.headers } returns emptyMap()
        val users = mockk<Store<User, String>>()
        every { users.updateOne(any(), putUserRequestRoot.convertToMap().mapKeys { it.key.toString() }) } returns false

//        try {
//            call.putUser(users, jwt)
//            verify {  }
//        }
//        catch (e: Exception) {
//            e.printStackTrace()
//        }
    }
}
