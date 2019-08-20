package com.hexagonkt.realworld.routes

import com.fasterxml.jackson.annotation.JsonInclude
import com.hexagonkt.helpers.CodedException
import com.hexagonkt.helpers.MultipleException
import com.hexagonkt.http.server.Call
import com.hexagonkt.http.server.Router
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.rest.cors
import com.hexagonkt.realworld.services.User
import com.hexagonkt.serialization.Json

data class OkResponse(val message: String)

data class ErrorResponse(val body: List<String> = listOf("Unknown error"))

data class ErrorResponseRoot(val errors: ErrorResponse)

@JsonInclude(JsonInclude.Include.NON_NULL)
data class UserResponse(
    val email: String,
    val username: String,
    val bio: String,
    val image: String,
    val token: String
)

data class UserResponseRoot(val user: UserResponse) {
    constructor(user: User, token: String) : this(
        UserResponse(
            email = user.email,
            username = user.username,
            bio = user.bio ?: "",
            image = user.image?.toString() ?: "",
            token = token
        )
    )
}

internal val router: Router = Router {
    cors()
    path("/users", usersRouter)
    path("/user", userRouter)
    path("/profiles/{username}", profilesRouter)
    path("/articles", articlesRouter)
    path("/tags", tagsRouter)
    error(Exception::class) { errorHandler(it) }
}

// TODO Map all errors (HTTP codes included)
internal fun Call.errorHandler(error: Exception) {
    when (error) {
        is CodedException -> {
            val cause = error.cause
            val status = error.code
            val messages =
                if (cause is MultipleException) cause.causes.map { it.message ?: "<no message>" }
                else listOf(error.message ?: "")
            send(status, ErrorResponseRoot(ErrorResponse(messages)), Json, Charsets.UTF_8)
        }
        is MultipleException -> {

        }
        else -> {
            val errorMessage = error.javaClass.simpleName + ": " + (error.message ?: "<no message>")
            send(500, ErrorResponseRoot(ErrorResponse(listOf(errorMessage))), Json, Charsets.UTF_8)
        }
    }
}

internal fun Router.authenticate(jwt: Jwt) {
    before("/") { parsePrincipal(jwt) }
    before("/*") { parsePrincipal(jwt) }
}

private fun Call.parsePrincipal(jwt: Jwt) {
    val token = request.headers["Authorization"]?.firstOrNull() ?: halt(401, "Unauthorized")
    val principal = jwt.verify(token.removePrefix("Token").trim())
    attributes["principal"] = principal
}
