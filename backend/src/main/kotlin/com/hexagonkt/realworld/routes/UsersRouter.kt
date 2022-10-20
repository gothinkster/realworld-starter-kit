package com.hexagonkt.realworld.routes

import com.hexagonkt.core.media.ApplicationMedia.JSON
import com.hexagonkt.core.require
import com.hexagonkt.core.requireKeys
import com.hexagonkt.http.model.ClientErrorStatus.UNAUTHORIZED
import com.hexagonkt.http.server.handlers.HttpServerContext
import com.hexagonkt.http.server.handlers.path
import com.hexagonkt.realworld.jwt
import com.hexagonkt.realworld.messages.*
import com.hexagonkt.realworld.Jwt
import com.hexagonkt.realworld.services.User
import com.hexagonkt.realworld.users
import com.hexagonkt.rest.bodyMap
import com.hexagonkt.serialization.serialize
import com.hexagonkt.store.Store

internal val usersRouter by lazy {
    path {
        delete("/{username}") { deleteUser(users) }
        post("/login") { login(users, jwt) }
        post { register(users, jwt) }
    }
}

private fun HttpServerContext.register(users: Store<User, String>, jwt: Jwt): HttpServerContext {
    val user = RegistrationRequest(request.bodyMap().requireKeys("user"))

    val key = users.insertOne(User(user.username, user.email, user.password))
    val content = UserResponseRoot(
        UserResponse(
            email = user.email,
            username = key,
            bio = "",
            image = "",
            token = jwt.sign(key)
        )
    ).serialize(JSON)

    return created(content, contentType = contentType)
}

private fun HttpServerContext.login(users: Store<User, String>, jwt: Jwt): HttpServerContext {
    val bodyUser = LoginRequest(request.bodyMap().requireKeys("user"))
    val filter = mapOf(User::email.name to bodyUser.email)
    val user = users.findOne(filter) ?: return notFound("Not Found")
    return if (user.password == bodyUser.password) {
        val content = UserResponseRoot(user, jwt.sign(user.username)).serialize(JSON)
        ok(content, contentType = contentType)
    } else {
        clientError(UNAUTHORIZED, "Bad credentials")
    }
}

// TODO Authenticate and require 'root' user or owner
private fun HttpServerContext.deleteUser(users: Store<User, String>): HttpServerContext {
    val username = pathParameters.require("username")
    val deleteOne = users.deleteOne(username)
    return if (deleteOne)
        ok(OkResponse("$username deleted").serialize(JSON), contentType = contentType)
    else
        notFound("$username not found")
}
