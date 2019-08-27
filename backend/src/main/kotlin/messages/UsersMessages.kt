package com.hexagonkt.realworld.messages

data class RegistrationRequest(
    val email: String,
    val username: String,
    val password: String
)

data class RegistrationRequestRoot(val user: RegistrationRequest)
data class LoginRequest(
    val email: String,
    val password: String
)

data class LoginRequestRoot(val user: LoginRequest)
