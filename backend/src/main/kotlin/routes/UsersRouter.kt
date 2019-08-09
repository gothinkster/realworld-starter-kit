package com.hexagonkt.realworld.routes

import com.hexagonkt.http.server.Router
import com.hexagonkt.realworld.injector
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.services.User
import com.hexagonkt.store.Store

data class RegistrationRequest(
    val email: String,
    val username: String,
    val password: String
)

data class RegistrationRequestRoot(val user: RegistrationRequest)

data class LoginRequest(
    val email: String,
    val password: String
)

data class LoginRequestRoot(val user: LoginRequest)

internal val usersRouter = Router {
    val jwt: Jwt = injector.inject()
    val users: Store<User, String> = injector.inject<Store<User, String>>(User::class)

    // TODO Authenticate and require 'root' user or owner
    delete("/{username}") {
        if (users.deleteOne(pathParameters["username"])) ok() else send(404)
    }

    post("/login") {
        val bodyUser = request.body<LoginRequestRoot>().user
        val filter = mapOf(User::email.name to bodyUser.email)
        val user = users.findOne(filter) ?: halt(404, "Not Found")
        if (user.password == bodyUser.password) {
            val content = UserResponseRoot(
                UserResponse(
                    email = user.email,
                    username = user.username,
                    bio = user.bio ?: "",
                    image = user.image?.toString() ?: "",
                    token = jwt.sign(user.username)
                )
            )

            ok(content, charset = Charsets.UTF_8)
        } else {
            send(401, "Bad credentials")
        }
    }

    post {
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

        ok(content, charset = Charsets.UTF_8)
    }
}
