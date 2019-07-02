package com.hexagonkt.realworld

data class UsersPostRequest(
    val email: String,
    val username: String,
    val password: String
)

data class UsersPostResponse(
    val email: String,
    val username: String,
    val bio: String,
    val image: String,
    val token: String
)

data class WrappedUsersPostRequest(val user: UsersPostRequest)

data class WrappedUsersPostResponse(val user: UsersPostResponse)

data class UsersLoginPostRequest(
    val email: String,
    val password: String
)

data class UsersLoginPostResponse(
    val email: String,
    val password: String
)
