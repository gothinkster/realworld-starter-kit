package com.hexagonkt.realworld.routes

import com.auth0.jwt.interfaces.DecodedJWT
import com.hexagonkt.core.MultipleException
import com.hexagonkt.core.fail
import com.hexagonkt.core.media.ApplicationMedia.JSON
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
import com.hexagonkt.serialization.serialize
import kotlin.text.Charsets.UTF_8

val contentType = ContentType(JSON, charset = UTF_8)

internal val router by lazy {
    path {
        filter(
            pattern = "*",
            callback = CorsCallback(allowedHeaders = setOf("accept", "user-agent", "host", "content-type"))
        )

        after("*") {
            if (status.code in setOf(401, 403, 404)) statusCodeHandler(status, response.body)
            else this
        }

        path("/users", usersRouter)
        path("/user", userRouter)
        path("/profiles/{username}", profilesRouter)
        path("/articles", articlesRouter)
        path("/tags", tagsRouter)

        exception(MultipleException::class) { multipleExceptionHandler(exception ?: fail) }
        exception(Exception::class) { exceptionHandler(exception ?: fail) }
    }
}

internal fun HttpServerContext.statusCodeHandler(status: HttpStatus, body: Any): HttpServerContext {
    val messages = when (body) {
        is List<*> -> body.mapNotNull { it?.toString() }
        else -> listOf(body.toString())
    }

    return send(status, ErrorResponseRoot(ErrorResponse(messages)).serialize(JSON), contentType = contentType)
}

internal fun HttpServerContext.multipleExceptionHandler(error: Exception): HttpServerContext {
    return if (error is MultipleException) {
        val messages = error.causes.map { it.message ?: "<no message>" }
        internalServerError(ErrorResponseRoot(ErrorResponse(messages)), contentType = contentType)
    }
    else this
}

internal fun HttpServerContext.exceptionHandler(error: Exception): HttpServerContext {
    val errorMessage = error.javaClass.simpleName + ": " + (error.message ?: "<no message>")
    val errorResponseRoot = ErrorResponseRoot(ErrorResponse(listOf(errorMessage)))
    return internalServerError(errorResponseRoot.serialize(JSON), contentType = contentType)
}

val authenticator = filter("*") {
    val principal = parsePrincipal(jwt)

    if (principal == null) next()
    else send(attributes = attributes + ("principal" to principal)).next()
}

internal fun HttpServerContext.parsePrincipal(jwt: Jwt): DecodedJWT? {
    val token = request.authorization

    return if (token == null) {
        null
    }
    else {
        jwt.verify(token.value)
    }
}
