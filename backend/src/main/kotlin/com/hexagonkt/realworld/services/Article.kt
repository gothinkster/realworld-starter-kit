package com.hexagonkt.realworld.services

import com.hexagonkt.core.fieldsMapOfNotNull
import java.time.LocalDateTime

data class Article(
    val slug: String,
    val author: String,
    val title: String,
    val description: String,
    val body: String,
    val tagList: Set<String>,
    val createdAt: LocalDateTime = LocalDateTime.now(),
    val updatedAt: LocalDateTime = LocalDateTime.now(),
    val favoritedBy: Set<String> = emptySet(),
    val comments: List<Comment> = emptyList()
) {
    fun toMap(): Map<String, *> =
        fieldsMapOfNotNull(
            Article::slug to slug,
            Article::author to author,
            Article::title to title,
            Article::description to description,
            Article::body to body,
            Article::tagList to tagList,
            Article::createdAt to createdAt,
            Article::updatedAt to updatedAt,
            Article::favoritedBy to favoritedBy,
            Article::comments to comments.map(Comment::toMap),
        )
}
