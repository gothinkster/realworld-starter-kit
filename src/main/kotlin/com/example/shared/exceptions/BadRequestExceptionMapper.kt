package com.example.shared.exceptions

import jakarta.ws.rs.core.Response
import jakarta.ws.rs.ext.ExceptionMapper
import jakarta.ws.rs.ext.Provider

@Provider
class BadRequestExceptionMapper : ExceptionMapper<BadRequestException> {
    override fun toResponse(exception: BadRequestException): Response =
        Response
            .status(Response.Status.BAD_REQUEST)
            .entity(mapOf("errors" to mapOf("body" to listOf(exception.message))))
            .build()
}
