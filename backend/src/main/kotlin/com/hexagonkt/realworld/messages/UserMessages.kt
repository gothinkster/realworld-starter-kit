package com.hexagonkt.realworld.messages

import com.hexagonkt.core.fieldsMapOf
import com.hexagonkt.core.keys

data class PutUserRequest(
    val email: String? = null,
    val password: String? = null,
    val bio: String? = null,
    val image: String? = null
) {
    constructor(data: Map<*, *>) : this(
        data.keys("user", PutUserRequest::email),
        data.keys("user", PutUserRequest::password),
        data.keys("user", PutUserRequest::bio),
        data.keys("user", PutUserRequest::image),
    )

    fun toFieldsMap(): Map<String, *> =
        fieldsMapOf(
            PutUserRequest::email to email,
            PutUserRequest::password to password,
            PutUserRequest::bio to bio,
            PutUserRequest::image to image,
        )
}
