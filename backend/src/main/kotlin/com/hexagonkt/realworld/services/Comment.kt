package com.hexagonkt.realworld.services

import com.hexagonkt.core.fieldsMapOfNotNull
import java.time.LocalDateTime

data class Comment(
    val id: Int,
    val author: String,
    val body: String,
    val createdAt: LocalDateTime = LocalDateTime.now(),
    val updatedAt: LocalDateTime = LocalDateTime.now()
) {
    fun toMap(): Map<String, *> =
        fieldsMapOfNotNull(
            Comment::id to id,
            Comment::author to author,
            Comment::body to body,
            Comment::createdAt to createdAt,
            Comment::updatedAt to updatedAt,
        )
}
