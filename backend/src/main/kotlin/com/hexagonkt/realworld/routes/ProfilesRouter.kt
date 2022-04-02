package com.hexagonkt.realworld.routes

import com.auth0.jwt.interfaces.DecodedJWT
import com.hexagonkt.core.helpers.require
import com.hexagonkt.http.server.Call
import com.hexagonkt.http.server.Router
import com.hexagonkt.realworld.createJwt
import com.hexagonkt.realworld.createUserStore
import com.hexagonkt.realworld.messages.ProfileResponse
import com.hexagonkt.realworld.messages.ProfileResponseRoot
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.services.User
import com.hexagonkt.store.Store

internal val profilesRouter by lazy {
    Router {
        val jwt: Jwt = createJwt()
        val users: Store<User, String> = createUserStore()

        authenticate(jwt)
        post("/follow") { followProfile(users, true) }
        delete("/follow") { followProfile(users, false) }
        get { getProfile(users) }
    }
}

private fun Call.getProfile(users: Store<User, String>) {
    val principal = attributes["principal"] as DecodedJWT
    val user = users.findOne(principal.subject) ?: halt(404, "Not Found")
    val profile = users.findOne(pathParameters.require("username")) ?: halt(404, "Not Found")
    val content = ProfileResponseRoot(
        ProfileResponse(
            username = profile.username,
            bio = profile.bio ?: "",
            image = profile.image?.toString() ?: "",
            following = user.following.contains(profile.username)
        )
    )

    ok(content, charset = Charsets.UTF_8)
}

private fun Call.followProfile(users: Store<User, String>, follow: Boolean) {
    val principal = attributes["principal"] as DecodedJWT
    val user = users.findOne(principal.subject) ?: halt(404, "Not Found")
    val followingList =
        if (follow) user.following + pathParameters["username"]
        else user.following - pathParameters["username"]
    val updated = users.updateOne(principal.subject, mapOf("following" to followingList))
    if (!updated)
        halt(500)
    val profile = users.findOne(pathParameters.require("username")) ?: halt(404, "Not Found")
    val content = ProfileResponseRoot(
        ProfileResponse(
            username = profile.username,
            bio = profile.bio ?: "",
            image = profile.image?.toString() ?: "",
            following = follow
        )
    )

    ok(content, charset = Charsets.UTF_8)
}
