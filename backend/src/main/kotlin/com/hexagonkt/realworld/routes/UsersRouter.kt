package com.hexagonkt.realworld.routes

import com.hexagonkt.core.media.ApplicationMedia.JSON
import com.hexagonkt.core.require
import com.hexagonkt.http.model.ClientErrorStatus.UNAUTHORIZED
import com.hexagonkt.http.model.ContentType
import com.hexagonkt.http.server.handlers.HttpServerContext
import com.hexagonkt.http.server.handlers.path
import com.hexagonkt.realworld.createJwt
import com.hexagonkt.realworld.createUserStore
import com.hexagonkt.realworld.messages.*
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.rest.parseBodyMap
import com.hexagonkt.realworld.services.User
import com.hexagonkt.store.Store

import kotlin.text.Charsets.UTF_8

internal val usersRouter by lazy {
    path {
        val jwt: Jwt = createJwt()
        val users: Store<User, String> = createUserStore()

        delete("/{username}") { deleteUser(users) }
        post("/login") { login(users, jwt) }
        post { register(users, jwt) }
    }
}

private fun HttpServerContext.register(users: Store<User, String>, jwt: Jwt): HttpServerContext {
    val user = RegistrationRequest(parseBodyMap(JSON))

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

    return created(content, contentType = ContentType(JSON, charset = UTF_8))
}

private fun HttpServerContext.login(users: Store<User, String>, jwt: Jwt): HttpServerContext {
    val bodyUser = LoginRequest(parseBodyMap(JSON))
    val filter = mapOf(User::email.name to bodyUser.email)
    val user = users.findOne(filter) ?: return notFound("Not Found")
    return if (user.password == bodyUser.password) {
        val content = UserResponseRoot(user, jwt.sign(user.username))
        ok(content, contentType = ContentType(JSON, charset = UTF_8))
    } else {
        clientError(UNAUTHORIZED, "Bad credentials")
    }
}

// TODO Authenticate and require 'root' user or owner
private fun HttpServerContext.deleteUser(users: Store<User, String>): HttpServerContext {
    val username = pathParameters.require("username")
    return if (users.deleteOne(username))
        ok(OkResponse("$username deleted"), contentType = ContentType(JSON, charset = UTF_8))
    else
        notFound("$username not found")
}
