package com.hexagonkt.realworld.messages

import com.fasterxml.jackson.annotation.JsonInclude
import com.hexagonkt.realworld.services.User

data class OkResponse(val message: String)
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
