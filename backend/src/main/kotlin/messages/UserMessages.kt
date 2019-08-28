package com.hexagonkt.realworld.messages

data class PutUserRequest(
    val email: String? = null,
    val password: String? = null,
    val bio: String? = null,
    val image: String? = null
)

data class PutUserRequestRoot(val user: PutUserRequest)
