package com.hexagonkt.realworld.messages

internal data class PutUserRequest(
    val email: String? = null,
    val password: String? = null,
    val bio: String? = null,
    val image: String? = null
)

internal data class PutUserRequestRoot(val user: PutUserRequest)
