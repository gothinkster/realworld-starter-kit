package com.hexagonkt.realworld.routes

import com.hexagonkt.http.server.Call
import com.hexagonkt.http.server.Router
import com.hexagonkt.realworld.createJwt
import com.hexagonkt.realworld.createUserStore
import com.hexagonkt.realworld.messages.PutUserRequestRoot
import com.hexagonkt.realworld.messages.UserResponseRoot
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.services.User
import com.hexagonkt.serialization.toFieldsMap
import com.hexagonkt.store.Store

import kotlin.text.Charsets.UTF_8

internal val userRouter by lazy {
    Router {
        val jwt: Jwt = createJwt()
        val users: Store<User, String> = createUserStore()

        authenticate(jwt)
        get { getUser(users, jwt) }
        put { putUser(users, jwt) }
    }
}

internal fun Call.putUser(users: Store<User, String>, jwt: Jwt) {
    val principal = requirePrincipal(jwt)
    val body = request.body<PutUserRequestRoot>().user
    val updates = body.toFieldsMap().mapKeys { it.key.toString() }

    val updated = users.updateOne(principal.subject, updates)

    if (updated)
        getUser(users, jwt)
    else
        halt(500, "Username ${principal.subject} not updated")
}

internal fun Call.getUser(users: Store<User, String>, jwt: Jwt) {
    val principal = requirePrincipal(jwt)
    val subject = principal.subject
    val user = users.findOne(subject) ?: halt(404, "User: $subject not found")
    val token = jwt.sign(user.username)

    ok(UserResponseRoot(user, token), charset = UTF_8)
}
