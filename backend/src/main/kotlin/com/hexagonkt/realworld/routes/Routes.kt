package com.hexagonkt.realworld.routes

import com.auth0.jwt.interfaces.DecodedJWT
import com.hexagonkt.core.CodedException
import com.hexagonkt.core.MultipleException
import com.hexagonkt.core.fail
import com.hexagonkt.core.media.ApplicationMedia
import com.hexagonkt.http.model.ClientErrorStatus.UNAUTHORIZED
import com.hexagonkt.http.model.ContentType
import com.hexagonkt.http.model.HttpStatus
import com.hexagonkt.http.server.callbacks.CorsCallback
import com.hexagonkt.http.server.handlers.HttpServerContext
import com.hexagonkt.http.server.handlers.filter
import com.hexagonkt.http.server.handlers.path
import com.hexagonkt.realworld.jwt
import com.hexagonkt.realworld.messages.ErrorResponse
import com.hexagonkt.realworld.messages.ErrorResponseRoot
import com.hexagonkt.realworld.Jwt
import kotlin.text.Charsets.UTF_8

val contentType = ContentType(ApplicationMedia.JSON, charset = UTF_8)

internal val router by lazy {
    path {
        filter(
            pattern = "*",
            callback = CorsCallback(allowedHeaders = setOf("accept", "user-agent", "host", "content-type"))
        )

        path("/users", usersRouter)
        path("/user", userRouter)
        path("/profiles/{username}", profilesRouter)
        path("/articles", articlesRouter)
        path("/tags", tagsRouter)

        exception(CodedException::class) {
            val codedException = exception as CodedException
            if (codedException.code in setOf(401, 403, 404, 500)) statusCodeHandler(codedException)
            else this
        }

        exception(MultipleException::class) { multipleExceptionHandler(exception ?: fail) }
        exception(Exception::class) { exceptionHandler(exception ?: fail) }
    }
}

internal fun HttpServerContext.statusCodeHandler(exception: CodedException): HttpServerContext {
    val messages = when (val body = response.body) {
        is List<*> -> body.mapNotNull { it?.toString() }
        else -> listOf(exception.message ?: exception::class.java.name)
    }

    val status = HttpStatus(exception.code)
    return send(status, ErrorResponseRoot(ErrorResponse(messages)), contentType = contentType)
}

internal fun HttpServerContext.multipleExceptionHandler(error: Exception): HttpServerContext {
    return if (error is MultipleException) {
        val messages = error.causes.map { it.message ?: "<no message>" }
        internalServerError(ErrorResponseRoot(ErrorResponse(messages)), contentType = ContentType(ApplicationMedia.JSON, charset = UTF_8))
    }
    else this
}

internal fun HttpServerContext.exceptionHandler(error: Exception): HttpServerContext {
    val errorMessage = error.javaClass.simpleName + ": " + (error.message ?: "<no message>")
    return internalServerError(ErrorResponseRoot(ErrorResponse(listOf(errorMessage))), contentType = ContentType(ApplicationMedia.JSON, charset = UTF_8))
}

val authenticator = filter("*") {
    val principal = parsePrincipal(jwt)

    if (principal == null) unauthorized("Unauthorized")
    else next()
}

internal fun HttpServerContext.unauthorized(body: String = "Unauthorized"): HttpServerContext =
    clientError(UNAUTHORIZED, body)

internal fun HttpServerContext.parsePrincipal(jwt: Jwt): DecodedJWT? {
    val token = request.headers["authorization"]

    return if (token == null) {
        null
    }
    else {
        jwt.verify(token.removePrefix("Token").trim())
    }
}
