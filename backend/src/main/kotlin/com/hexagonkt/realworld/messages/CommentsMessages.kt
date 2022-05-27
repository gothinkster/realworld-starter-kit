package com.hexagonkt.realworld.messages

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL
import com.hexagonkt.http.toHttpFormat
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
        createdAt = comment.createdAt.toHttpFormat(),
        updatedAt = comment.updatedAt.toHttpFormat(),
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

@JsonInclude(NON_NULL)
data class CommentsResponseRoot(val comments: List<CommentResponse>)
