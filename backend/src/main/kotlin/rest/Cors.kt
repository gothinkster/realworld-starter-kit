package com.hexagonkt.realworld.rest

import com.hexagonkt.http.ALL
import com.hexagonkt.http.Method
import com.hexagonkt.http.Method.*
import com.hexagonkt.http.server.Request
import com.hexagonkt.http.server.Router

fun Router.cors(
    origin: String = "*",
    methods: Set<Method> = ALL,
    headers: Set<String> = emptySet(),
    credentials: Boolean = true,
    preFlightStatus: Int = 204) {

    before {

        response.setHeader("Access-Control-Allow-Origin", origin)
        response.setHeader("Access-Control-Allow-Credentials", credentials)
    }

    options("/*") {
        val requestHeaders = if (headers.isEmpty()) request.headers.keys.toSet() else headers
        response.setHeader("Access-Control-Allow-Headers", requestHeaders.joinToString(","))
        response.setHeader("Access-Control-Request-Method", methods.joinToString(","))
        response.status = preFlightStatus
    }
}

fun Request.simpleRequest(): Boolean =
    method in listOf(GET, HEAD, POST) &&
    contentType?.substringBefore(";") in listOf(null, "application/x-www-form-urlencoded", "multipart/form-data", "text/plain")
