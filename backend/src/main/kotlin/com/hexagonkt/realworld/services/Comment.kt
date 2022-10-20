package com.hexagonkt.realworld.services

import java.time.LocalDateTime

data class Comment(
    val id: Int,
    val author: String,
    val body: String,
    val createdAt: LocalDateTime = LocalDateTime.now(),
    val updatedAt: LocalDateTime = LocalDateTime.now()
)
