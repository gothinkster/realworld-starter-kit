package com.hexagonkt.realworld.routes

import com.auth0.jwt.interfaces.DecodedJWT
import com.hexagonkt.helpers.MultipleException
import com.hexagonkt.helpers.withZone
import com.hexagonkt.http.server.Call
import com.hexagonkt.http.server.Router
import com.hexagonkt.realworld.messages.ErrorResponse
import com.hexagonkt.realworld.messages.ErrorResponseRoot
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.rest.cors
import com.hexagonkt.serialization.Json
import java.time.LocalDateTime
import java.time.ZoneOffset.UTC
import java.time.format.DateTimeFormatter.ISO_LOCAL_DATE_TIME

internal val router: Router = Router {
    cors()

    path("/users", usersRouter)
    path("/user", userRouter)
    path("/profiles/{username}", profilesRouter)
    path("/articles", articlesRouter)
    path("/tags", tagsRouter)

    setOf(401, 403, 404, 500).forEach { code ->
        error(code) { statusCodeHandler(code) }
    }

    error(MultipleException::class) { multipleExceptionHandler(it) }
    error(Exception::class) { exceptionHandler(it) }
}

internal fun Call.statusCodeHandler(code: Int) {
    @Suppress("MoveVariableDeclarationIntoWhen") // Required because response.body is an expression
    val body = response.body

    val messages = when (body) {
        is List<*> -> body.mapNotNull { it?.toString() }
        else -> listOf(response.body.toString())
    }
    send(code, ErrorResponseRoot(ErrorResponse(messages)), Json, Charsets.UTF_8)
}

internal fun Call.multipleExceptionHandler(error: Exception) {
    if (error is MultipleException) {
        val messages = error.causes.map { it.message ?: "<no message>" }
        send(500, ErrorResponseRoot(ErrorResponse(messages)), Json, Charsets.UTF_8)
    }
}

internal fun Call.exceptionHandler(error: Exception) {
    val errorMessage = error.javaClass.simpleName + ": " + (error.message ?: "<no message>")
    send(500, ErrorResponseRoot(ErrorResponse(listOf(errorMessage))), Json, Charsets.UTF_8)
}

internal fun Router.authenticate(jwt: Jwt) {
    before("/") { requirePrincipal(jwt) }
    before("/*") { requirePrincipal(jwt) }
}

internal fun Call.requirePrincipal(jwt: Jwt): DecodedJWT =
    parsePrincipal(jwt) ?: halt(401, "Unauthorized")

internal fun Call.parsePrincipal(jwt: Jwt): DecodedJWT? {
    val token = request.headers["Authorization"]?.firstOrNull()

    return if (token == null) {
        null
    }
    else {
        val principal = jwt.verify(token.removePrefix("Token").trim())
        attributes["principal"] = principal
        principal
    }
}

internal fun LocalDateTime.toIso8601() =
    this.withZone().withZoneSameInstant(UTC).format(ISO_LOCAL_DATE_TIME) + "Z"
