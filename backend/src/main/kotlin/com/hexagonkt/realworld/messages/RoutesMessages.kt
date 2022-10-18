package com.hexagonkt.realworld.messages

import com.hexagonkt.core.fieldsMapOfNotNull
import com.hexagonkt.core.requireKeys
import com.hexagonkt.realworld.services.User

data class OkResponse(val message: String)

data class ErrorResponse(val body: List<String> = listOf("Unknown error")) {
    fun toMap(): Map<String, *> =
        fieldsMapOfNotNull(ErrorResponse::body to body)
}

data class ErrorResponseRoot(val errors: ErrorResponse) {
    fun toMap(): Map<String, *> =
        fieldsMapOfNotNull(ErrorResponseRoot::errors to errors.toMap())
}

data class UserResponse(
    val email: String,
    val username: String,
    val bio: String,
    val image: String,
    val token: String
) {
    constructor(data: Map<*, *>) : this(
        data.requireKeys<String>(UserResponse::email),
        data.requireKeys<String>(UserResponse::username),
        data.requireKeys<String>(UserResponse::bio),
        data.requireKeys<String>(UserResponse::image),
        data.requireKeys<String>(UserResponse::token),
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
