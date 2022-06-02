package com.hexagonkt.realworld.routes

import com.auth0.jwt.interfaces.DecodedJWT
import com.hexagonkt.core.media.ApplicationMedia.JSON
import com.hexagonkt.core.require
import com.hexagonkt.http.model.ContentType
import com.hexagonkt.http.server.handlers.HttpServerContext
import com.hexagonkt.http.server.handlers.path
import com.hexagonkt.realworld.createJwt
import com.hexagonkt.realworld.createUserStore
import com.hexagonkt.realworld.messages.ProfileResponse
import com.hexagonkt.realworld.messages.ProfileResponseRoot
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.services.User
import com.hexagonkt.store.Store
import kotlin.text.Charsets.UTF_8

internal val profilesRouter by lazy {
    path {
        val jwt: Jwt = createJwt()
        val users: Store<User, String> = createUserStore()

        authenticate(jwt)
        post("/follow") { followProfile(users, true) }
        delete("/follow") { followProfile(users, false) }
        get { getProfile(users) }
    }
}

private fun HttpServerContext.getProfile(users: Store<User, String>): HttpServerContext {
    val principal = attributes["principal"] as DecodedJWT
    val user = users.findOne(principal.subject) ?: return notFound("Not Found")
    val profile = users.findOne(pathParameters.require("username")) ?: return notFound("Not Found")
    val content = ProfileResponseRoot(
        ProfileResponse(
            username = profile.username,
            bio = profile.bio ?: "",
            image = profile.image?.toString() ?: "",
            following = user.following.contains(profile.username)
        )
    )

    return ok(content, contentType = ContentType(JSON, charset = UTF_8))
}

private fun HttpServerContext.followProfile(
    users: Store<User, String>, follow: Boolean): HttpServerContext {

    val principal = attributes["principal"] as DecodedJWT
    val user = users.findOne(principal.subject) ?: return notFound("Not Found")
    val followingList =
        if (follow) user.following + pathParameters["username"]
        else user.following - pathParameters["username"]
    val updated = users.updateOne(principal.subject, mapOf("following" to followingList))
    if (!updated)
        return internalServerError()
    val profile = users.findOne(pathParameters.require("username")) ?: return notFound("Not Found")
    val content = ProfileResponseRoot(
        ProfileResponse(
            username = profile.username,
            bio = profile.bio ?: "",
            image = profile.image?.toString() ?: "",
            following = follow
        )
    )

    return ok(content, contentType = ContentType(JSON, charset = UTF_8))
}
