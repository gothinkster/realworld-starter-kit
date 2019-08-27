package com.hexagonkt.realworld.routes

import com.auth0.jwt.interfaces.DecodedJWT
import com.hexagonkt.http.server.Call
import com.hexagonkt.http.server.Router
import com.hexagonkt.realworld.injector
import com.hexagonkt.realworld.messages.PutUserRequestRoot
import com.hexagonkt.realworld.messages.UserResponseRoot
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.services.User
import com.hexagonkt.serialization.convertToMap
import com.hexagonkt.store.Store

import kotlin.text.Charsets.UTF_8

internal val userRouter = Router {
    val jwt: Jwt = injector.inject()
    val users: Store<User, String> = injector.inject<Store<User, String>>(User::class)

    authenticate(jwt)
    get { getUser(users, jwt) }
    put { putUser(users, jwt) }
}

private fun Call.putUser(users: Store<User, String>, jwt: Jwt) {
    val principal = attributes["principal"] as DecodedJWT
    val body = request.body<PutUserRequestRoot>().user
    val updates = body.convertToMap().mapKeys { it.key.toString() }

    val updated = users.updateOne(principal.subject, updates)

    if (updated)
        getUser(users, jwt)
    else
        halt(500, "Username ${principal.subject} not updated")
}

private fun Call.getUser(users: Store<User, String>, jwt: Jwt) {
    val principal = attributes["principal"] as DecodedJWT
    val subject = principal.subject
    val user = users.findOne(subject) ?: halt(404, "User: $subject not found")
    val token = jwt.sign(user.username)

    ok(UserResponseRoot(user, token), charset = UTF_8)
}
