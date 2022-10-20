package com.hexagonkt.realworld.messages

import com.hexagonkt.core.requireKeys

data class ProfileResponse(
    val username: String,
    val bio: String,
    val image: String,
    val following: Boolean
) {
    constructor(data: Map<*, *>) : this(
        data.requireKeys("profile", ProfileResponse::username),
        data.requireKeys("profile", ProfileResponse::bio),
        data.requireKeys("profile", ProfileResponse::image),
        data.requireKeys("profile", ProfileResponse::following),
    )
}

data class ProfileResponseRoot(val profile: ProfileResponse)
