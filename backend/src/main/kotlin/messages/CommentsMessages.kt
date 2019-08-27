package com.hexagonkt.realworld.messages

import com.fasterxml.jackson.annotation.JsonInclude
import com.hexagonkt.realworld.routes.AuthorResponse
import com.hexagonkt.realworld.routes.toIso8601
import com.hexagonkt.realworld.services.Comment
import com.hexagonkt.realworld.services.User

data class CommentRequest(val body: String)

data class CommentRequestRoot(val comment: CommentRequest)

data class CommentResponse(
    val id: Int,
    val createdAt: String,
    val updatedAt: String,
    val body: String,
    val author: AuthorResponse
) {
    constructor(comment: Comment, author: User, user: User?): this(
        id = comment.id,
        createdAt = comment.createdAt.toIso8601(),
        updatedAt = comment.updatedAt.toIso8601(),
        body = comment.body,
        author = AuthorResponse(
            username = author.username,
            bio = author.bio ?: "",
            image = author.image?.toString() ?: "",
            following = user?.following?.contains(author.username) ?: false
        )
    )
}

data class CommentResponseRoot(val comment: CommentResponse)

@JsonInclude(JsonInclude.Include.NON_NULL)
data class CommentsResponseRoot(val comments: List<CommentResponse>)
