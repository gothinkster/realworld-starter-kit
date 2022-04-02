package com.hexagonkt.realworld.routes

import com.hexagonkt.core.helpers.require
import com.hexagonkt.http.server.Call
import com.hexagonkt.http.server.Router
import com.hexagonkt.realworld.createJwt
import com.hexagonkt.realworld.createUserStore
import com.hexagonkt.realworld.messages.*
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.services.User
import com.hexagonkt.serialization.json.Json
import com.hexagonkt.store.Store

import kotlin.text.Charsets.UTF_8

internal val usersRouter by lazy {
    Router {
        val jwt: Jwt = createJwt()
        val users: Store<User, String> = createUserStore()

        delete("/{username}") { deleteUser(users) }
        post("/login") { login(users, jwt) }
        post { register(users, jwt) }
    }
}

private fun Call.register(users: Store<User, String>, jwt: Jwt) {
    val user = request.body<RegistrationRequestRoot>().user
    val key = users.insertOne(User(user.username, user.email, user.password))
    val content = UserResponseRoot(
        UserResponse(
            email = user.email,
            username = key,
            bio = "",
            image = "",
            token = jwt.sign(key)
        )
    )

    send(201, content, Json, UTF_8)
}

private fun Call.login(users: Store<User, String>, jwt: Jwt) {
    val bodyUser = request.body<LoginRequestRoot>().user
    val filter = mapOf(User::email.name to bodyUser.email)
    val user = users.findOne(filter) ?: halt(404, "Not Found")
    if (user.password == bodyUser.password) {
        val content = UserResponseRoot(user, jwt.sign(user.username))
        ok(content, charset = UTF_8)
    } else {
        send(401, "Bad credentials")
    }
}

// TODO Authenticate and require 'root' user or owner
private fun Call.deleteUser(users: Store<User, String>) {
    val username = pathParameters.require("username")
    if (users.deleteOne(username)) ok(OkResponse("$username deleted"), Json, charset = UTF_8)
    else halt(404, "$username not found")
}
