package com.hexagonkt.realworld.rest

import com.hexagonkt.core.media.MediaType
import com.hexagonkt.http.server.handlers.HttpServerContext
import com.hexagonkt.serialization.parseList
import com.hexagonkt.serialization.parseMap

fun HttpServerContext.parseBodyList(mediaType: MediaType? = null): List<*> =
    request.bodyString().parseList(request.contentType?.mediaType ?: mediaType ?: error(""))

fun HttpServerContext.parseBodyMap(mediaType: MediaType? = null): Map<*, *> =
    request.bodyString().parseMap(request.contentType?.mediaType ?: mediaType ?: error(""))
