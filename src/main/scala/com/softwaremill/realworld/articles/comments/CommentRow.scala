package com.softwaremill.realworld.articles.comments

import java.time.Instant

case class CommentRow(commentId: Int, articleSlug: String, createdAt: Instant, updatedAt: Instant, authorId: Int, body: String)
