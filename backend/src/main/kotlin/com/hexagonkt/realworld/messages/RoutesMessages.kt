package com.hexagonkt.realworld.messages

import com.hexagonkt.core.requireString
import com.hexagonkt.core.withZone
import com.hexagonkt.realworld.services.User
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.format.DateTimeFormatter.ISO_ZONED_DATE_TIME

data class OkResponse(val message: String)

data class ErrorResponse(val body: List<String> = listOf("Unknown error"))

data class ErrorResponseRoot(val errors: ErrorResponse)

data class UserResponse(
    val email: String,
    val username: String,
    val bio: String,
    val image: String,
    val token: String
) {
    constructor(data: Map<*, *>) : this(
        data.requireString(UserResponse::email),
        data.requireString(UserResponse::username),
        data.requireString(UserResponse::bio),
        data.requireString(UserResponse::image),
        data.requireString(UserResponse::token),
    )
}

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

fun LocalDateTime.toUtc(): String =
    withZone(ZoneId.of("Z")).format(ISO_ZONED_DATE_TIME)
