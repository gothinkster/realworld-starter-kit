package com.hexagonkt.realworld.services

import com.hexagonkt.core.fieldsMapOfNotNull
import java.net.URL

data class User(
    val username: String,
    val email: String,
    val password: String,
    val bio: String? = null,
    val image: URL? = null,
    val following: Set<String> = emptySet()
) {
    fun toMap(): Map<String, *> =
        fieldsMapOfNotNull(
            User::username to username,
            User::email to email,
            User::password to password,
            User::bio to bio,
            User::image to image,
            User::following to following,
        )
}
