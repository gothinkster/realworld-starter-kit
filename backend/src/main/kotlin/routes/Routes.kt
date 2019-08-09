package com.hexagonkt.realworld.routes

import com.fasterxml.jackson.annotation.JsonInclude
import com.hexagonkt.http.server.Call
import com.hexagonkt.http.server.Router
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.rest.cors
import com.hexagonkt.serialization.Json

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

data class UserResponseRoot(val user: UserResponse)

internal val router: Router = Router {
    cors()
    path("/users", usersRouter)
    path("/user", userRouter)
    path("/profiles/{username}", profilesRouter)
    path("/articles", articlesRouter)
    path("/tags", tagsRouter)
    // TODO Map all errors (HTTP codes included)
    error(Exception::class) {
        val errorMessage = it.javaClass.simpleName + ": " + (it.message ?: "<no exception message>")
        send(500, ErrorResponseRoot(ErrorResponse(listOf(errorMessage))), Json, Charsets.UTF_8)
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
