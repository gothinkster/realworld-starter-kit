package com.hexagonkt.realworld.routes

import com.hexagonkt.core.media.ApplicationMedia.JSON
import com.hexagonkt.http.model.ContentType
import com.hexagonkt.http.server.handlers.HttpServerContext
import com.hexagonkt.http.server.handlers.path
import com.hexagonkt.realworld.createJwt
import com.hexagonkt.realworld.createUserStore
import com.hexagonkt.realworld.messages.PutUserRequest
import com.hexagonkt.realworld.messages.UserResponseRoot
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.rest.parseBodyMap
import com.hexagonkt.realworld.services.User
import com.hexagonkt.store.Store

import kotlin.text.Charsets.UTF_8

internal val userRouter by lazy {
    path {
        val jwt: Jwt = createJwt()
        val users: Store<User, String> = createUserStore()

        authenticate(jwt)
        get { getUser(users, jwt) }
        put { putUser(users, jwt) }
    }
}

internal fun HttpServerContext.putUser(users: Store<User, String>, jwt: Jwt): HttpServerContext {
    val principal = requirePrincipal(jwt)
    val body = PutUserRequest(parseBodyMap(JSON))
    val updates = body.toFieldsMap()

    val updated = users.updateOne(principal.subject, updates)

    return if (updated)
        getUser(users, jwt)
    else
        internalServerError("Username ${principal.subject} not updated")
}

internal fun HttpServerContext.getUser(users: Store<User, String>, jwt: Jwt): HttpServerContext {
    val principal = requirePrincipal(jwt)
    val subject = principal.subject
    val user = users.findOne(subject) ?: return notFound("User: $subject not found")
    val token = jwt.sign(user.username)

    return ok(UserResponseRoot(user, token), contentType = ContentType(JSON, charset = UTF_8))
}
