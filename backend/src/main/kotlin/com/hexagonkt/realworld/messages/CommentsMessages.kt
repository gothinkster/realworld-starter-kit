package com.hexagonkt.realworld.messages

import com.hexagonkt.core.requireKeys
import com.hexagonkt.realworld.services.Comment
import com.hexagonkt.realworld.services.User

data class CommentRequest(val body: String) {

    constructor(data: Map<*, *>) : this(
        data.requireKeys<String>(CommentRequest::body),
    )
}

data class CommentResponse(
    val id: Int,
    val createdAt: String,
    val updatedAt: String,
    val body: String,
    val author: AuthorResponse
) {
    constructor(data: Map<*, *>) : this(
        data.requireKeys(CommentResponse::id),
        data.requireKeys(CommentResponse::createdAt),
        data.requireKeys(CommentResponse::updatedAt),
        data.requireKeys(CommentResponse::body),
        AuthorResponse(data.requireKeys(CommentResponse::author)),
    )

    constructor(comment: Comment, author: User, user: User?): this(
        id = comment.id,
        createdAt = comment.createdAt.toUtc(),
        updatedAt = comment.updatedAt.toUtc(),
        body = comment.body,
        author = AuthorResponse(
            username = author.username,
            bio = author.bio ?: "",
            image = author.image?.toString() ?: "",
            following = user?.following?.contains(author.username) ?: false
        )
    )
}
