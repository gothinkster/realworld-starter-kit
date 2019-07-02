package com.hexagonkt.realworld

import java.net.URL
import java.time.LocalDateTime

data class User(
    val username: String,
    val email: String,
    val bio: String? = null,
    val image: URL? = null,
    val following: List<String> = emptyList(),
    val favorites: List<String> = emptyList()
)

data class Article(
    val slug: String,
    val author: String,
    val title: String,
    val description: String,
    val body: String,
    val tagList: List<String>,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime
)

data class Comment(
    val id: Int,
    val author: String,
    val body: String,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime
)
