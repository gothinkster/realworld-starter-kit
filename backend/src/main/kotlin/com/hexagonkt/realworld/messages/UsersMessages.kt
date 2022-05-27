package com.hexagonkt.realworld.messages

import com.hexagonkt.core.requireKeys

data class RegistrationRequest(
    val email: String,
    val username: String,
    val password: String
) {
    constructor(data: Map<*, *>) : this(
        data.requireKeys("user", RegistrationRequest::email),
        data.requireKeys("user", RegistrationRequest::username),
        data.requireKeys("user", RegistrationRequest::password),
    )
}

data class LoginRequest(
    val email: String,
    val password: String
) {
    constructor(data: Map<*, *>) : this(
        data.requireKeys("user", LoginRequest::email),
        data.requireKeys("user", LoginRequest::password),
    )
}
