package com.hexagonkt.realworld.messages

import com.hexagonkt.core.fieldsMapOf
import com.hexagonkt.core.requireKeys

data class RegistrationRequest(
    val email: String,
    val username: String,
    val password: String
) {
    constructor(data: Map<*, *>) : this(
        data.requireKeys(RegistrationRequest::email),
        data.requireKeys(RegistrationRequest::username),
        data.requireKeys(RegistrationRequest::password),
    )

    fun toMap(): Map<String, *> =
        fieldsMapOf(
            RegistrationRequest::email to email,
            RegistrationRequest::username to username,
            RegistrationRequest::password to password,
        )
}

data class LoginRequest(
    val email: String,
    val password: String
) {
    constructor(data: Map<*, *>) : this(
        data.requireKeys(LoginRequest::email),
        data.requireKeys(LoginRequest::password),
    )

    fun toMap(): Map<String, *> =
        fieldsMapOf(
            LoginRequest::email to email,
            LoginRequest::password to password,
        )
}
