package com.hexagonkt.realworld.messages

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL
import com.hexagonkt.realworld.routes.toIso8601
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.User

data class ArticleRequest(
    val title: String,
    val description: String,
    val body: String,
    val tagList: Set<String>
)

data class ArticleRequestRoot(val article: ArticleRequest)

data class AuthorResponse(
    val username: String,
    val bio: String,
    val image: String,
    val following: Boolean
)

data class ArticleCreationResponse(
    val slug: String,
    val title: String,
    val description: String,
    val body: String,
    val tagList: Set<String>,
    val createdAt: String,
    val updatedAt: String,
    val favorited: Boolean,
    val favoritesCount: Int,
    val author: String
)

data class ArticleCreationResponseRoot(val article: ArticleCreationResponse) {
    constructor(article: Article, subject: String) : this(
        ArticleCreationResponse(
            slug = article.slug,
            title = article.title,
            description = article.description,
            body = article.body,
            tagList = article.tagList,
            createdAt = article.createdAt.toIso8601(),
            updatedAt = article.updatedAt.toIso8601(),
            favorited = false,
            favoritesCount = 0,
            author = subject
        )
    )
}

data class PutArticleRequest(
    val title: String?,
    val description: String?,
    val body: String?,
    val tagList: Set<String> = emptySet()
)

data class PutArticleRequestRoot(val article: PutArticleRequest)

data class ArticleResponse(
    val slug: String,
    val title: String,
    val description: String,
    val body: String,
    val tagList: Set<String>,
    val createdAt: String,
    val updatedAt: String,
    val favorited: Boolean,
    val favoritesCount: Int,
    val author: AuthorResponse
)

data class ArticleResponseRoot(val article: ArticleResponse) {
    constructor(article: Article, author: User, user: User?) : this(
        ArticleResponse(
            slug = article.slug,
            title = article.title,
            description = article.description,
            body = article.body,
            tagList = article.tagList,
            createdAt = article.createdAt.toIso8601(),
            updatedAt = article.updatedAt.toIso8601(),
            favorited = article.favoritedBy.contains(user?.username),
            favoritesCount = article.favoritedBy.size,
            author = AuthorResponse(
                username = author.username,
                bio = author.bio ?: "",
                image = author.image?.toString() ?: "",
                following = user?.following?.contains(author.username) ?: false
            )
        )
    )
}

@JsonInclude(NON_NULL)
data class ArticlesResponseRoot(
    val articles: List<ArticleResponse>,
    val articlesCount: Long
)
