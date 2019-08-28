package com.hexagonkt.realworld.messages

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL

@JsonInclude(NON_NULL)
data class ProfileResponse(
    val username: String,
    val bio: String,
    val image: String,
    val following: Boolean
)

data class ProfileResponseRoot(val profile: ProfileResponse)
