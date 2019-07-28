package com.hexagonkt.realworld

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL

data class UsersPostRequest(
    val email: String,
    val username: String,
    val password: String
)

@JsonInclude(NON_NULL)
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

@JsonInclude(NON_NULL)
data class UsersLoginPostResponse(
    val email: String,
    val username: String,
    val bio: String,
    val image: String,
    val token: String
)

data class WrappedUsersLoginPostRequest(val user: UsersLoginPostRequest)

data class WrappedUsersLoginPostResponse(val user: UsersLoginPostResponse)
