package com.hexagonkt.realworld.services

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
)
