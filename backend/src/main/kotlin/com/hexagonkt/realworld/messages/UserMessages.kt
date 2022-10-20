package com.hexagonkt.realworld.messages

import com.hexagonkt.core.fieldsMapOf
import com.hexagonkt.core.getString

data class PutUserRequest(
    val email: String? = null,
    val password: String? = null,
    val bio: String? = null,
    val image: String? = null
) {
    constructor(data: Map<*, *>) : this(
        data.getString(PutUserRequest::email),
        data.getString(PutUserRequest::password),
        data.getString(PutUserRequest::bio),
        data.getString(PutUserRequest::image),
    )

    fun toFieldsMap(): Map<String, *> =
        fieldsMapOf(
            PutUserRequest::email to email,
            PutUserRequest::password to password,
            PutUserRequest::bio to bio,
            PutUserRequest::image to image,
        )
}
