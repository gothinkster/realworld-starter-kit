package com.hexagonkt.realworld.services

import java.net.URL
import java.time.LocalDateTime

data class User(
    val username: String,
    val email: String,
    val password: String,
    val bio: String? = null,
    val image: URL? = null,
    val following: Set<String> = emptySet()
)

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
)

data class Comment(
    val id: Int,
    val author: String,
    val body: String,
    val createdAt: LocalDateTime = LocalDateTime.now(),
    val updatedAt: LocalDateTime = LocalDateTime.now()
)
