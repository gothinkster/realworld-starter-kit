package com.softwaremill.realworld.articles.model

import java.time.Instant

case class ArticleRow(
    slug: String,
    title: String,
    description: String,
    body: String,
    createdAt: Instant,
    updatedAt: Instant,
    authorId: Int
)
