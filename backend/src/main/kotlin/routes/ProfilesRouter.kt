package com.hexagonkt.realworld.routes

import com.auth0.jwt.interfaces.DecodedJWT
import com.fasterxml.jackson.annotation.JsonInclude
import com.hexagonkt.http.server.Router
import com.hexagonkt.realworld.injector
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.services.User
import com.hexagonkt.store.Store

@JsonInclude(JsonInclude.Include.NON_NULL)
data class ProfileResponse(
    val username: String,
    val bio: String,
    val image: String,
    val following: Boolean
)

data class ProfileResponseRoot(val profile: ProfileResponse)

internal val profilesRouter = Router {
    val jwt: Jwt = injector.inject()
    val users: Store<User, String> = injector.inject<Store<User, String>>(User::class)

    authenticate(jwt)

    post("/follow") {
        val principal = attributes["principal"] as DecodedJWT
        val user = users.findOne(principal.subject) ?: halt(404, "Not Found")
        val updated = users.updateOne(principal.subject, mapOf("following" to user.following + pathParameters["username"]))
        val profile = users.findOne(pathParameters["username"]) ?: halt(404, "Not Found")
        val content = ProfileResponseRoot(
            ProfileResponse(
                username = profile.username,
                bio = profile.bio ?: "",
                image = profile.image?.toString() ?: "",
                following = updated
            )
        )

        ok(content, charset = Charsets.UTF_8)
    }

    delete("/follow") {
        val principal = attributes["principal"] as DecodedJWT
        val user = users.findOne(principal.subject) ?: halt(404, "Not Found")
        val updated = users.updateOne(principal.subject, mapOf("following" to user.following - pathParameters["username"]))
        val profile = users.findOne(pathParameters["username"]) ?: halt(404, "Not Found")
        val content = ProfileResponseRoot(
            ProfileResponse(
                username = profile.username,
                bio = profile.bio ?: "",
                image = profile.image?.toString() ?: "",
                following = !updated
            )
        )

        ok(content, charset = Charsets.UTF_8)
    }

    get {
        val principal = attributes["principal"] as DecodedJWT
        val user = users.findOne(principal.subject) ?: halt(404, "Not Found")
        val profile = users.findOne(pathParameters["username"]) ?: halt(404, "Not Found")
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
}
