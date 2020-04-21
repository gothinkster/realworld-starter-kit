package com.hexagonkt.realworld.routes

import com.auth0.jwt.interfaces.DecodedJWT
import com.hexagonkt.helpers.CodedException
import com.hexagonkt.helpers.MultipleException
import com.hexagonkt.http.server.Call
import com.hexagonkt.http.server.CorsSettings
import com.hexagonkt.http.server.Router
import com.hexagonkt.realworld.messages.ErrorResponse
import com.hexagonkt.realworld.messages.ErrorResponseRoot
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.serialization.Json
import kotlin.text.Charsets.UTF_8

internal val router: Router = Router {
    cors(CorsSettings(allowedHeaders = setOf("Accept", "User-Agent", "Host", "Content-Type")))

    path("/users", usersRouter)
    path("/user", userRouter)
    path("/profiles/{username}", profilesRouter)
    path("/articles", articlesRouter)
    path("/tags", tagsRouter)

    setOf(401, 403, 404, 500).forEach { code ->
        error(code) { statusCodeHandler(it) }
    }

    error(MultipleException::class) { multipleExceptionHandler(it) }
    error(Exception::class) { exceptionHandler(it) }
}

internal fun Call.statusCodeHandler(exception: CodedException) {
    @Suppress("MoveVariableDeclarationIntoWhen") // Required because response.body is an expression
    val body = response.body

    val messages = when (body) {
        is List<*> -> body.mapNotNull { it?.toString() }
        else -> listOf(exception.message ?: exception::class.java.name)
    }

    send(exception.code, ErrorResponseRoot(ErrorResponse(messages)), Json, UTF_8)
}

internal fun Call.multipleExceptionHandler(error: Exception) {
    if (error is MultipleException) {
        val messages = error.causes.map { it.message ?: "<no message>" }
        send(500, ErrorResponseRoot(ErrorResponse(messages)), Json, UTF_8)
    }
}

internal fun Call.exceptionHandler(error: Exception) {
    val errorMessage = error.javaClass.simpleName + ": " + (error.message ?: "<no message>")
    send(500, ErrorResponseRoot(ErrorResponse(listOf(errorMessage))), Json, UTF_8)
}

internal fun Router.authenticate(jwt: Jwt) {
    before("/") { requirePrincipal(jwt) }
    before("/*") { requirePrincipal(jwt) }
}

internal fun Call.requirePrincipal(jwt: Jwt): DecodedJWT =
    parsePrincipal(jwt) ?: halt(401, "Unauthorized")

internal fun Call.parsePrincipal(jwt: Jwt): DecodedJWT? {
    val token = request.headers["Authorization"]

    return if (token == null) {
        null
    }
    else {
        val principal = jwt.verify(token.removePrefix("Token").trim())
        attributes["principal"] = principal
        principal
    }
}
