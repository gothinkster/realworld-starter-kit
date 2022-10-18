package com.hexagonkt.realworld.messages

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL
import com.hexagonkt.core.*
import com.hexagonkt.http.toHttpFormat
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.User

data class ArticleRequest(
    val title: String,
    val description: String,
    val body: String,
    val tagList: Set<String>
) {
    constructor(data: Map<*, *>) : this(
        data.requireString(ArticleRequest::title),
        data.requireString(ArticleRequest::description),
        data.requireString(ArticleRequest::body),
        data.getStringsOrEmpty(ArticleRequest::tagList).toSet(),
    )
}

@JsonInclude(NON_NULL)
data class AuthorResponse(
    val username: String,
    val bio: String,
    val image: String,
    val following: Boolean
) {
    constructor(data: Map<*, *>) : this(
        username = data.requireKeys(AuthorResponse::username),
        bio = data.requireKeys(AuthorResponse::bio),
        image = data.requireKeys(AuthorResponse::image),
        following = data.requireKeys(AuthorResponse::following),
    )
}

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
) {
    constructor(data: Map<*, *>) : this(
        slug = data.requireKeys(ArticleCreationResponse::slug),
        title = data.requireKeys(ArticleCreationResponse::title),
        description = data.requireKeys(ArticleCreationResponse::description),
        body = data.requireKeys(ArticleCreationResponse::body),
        tagList = data.keys(ArticleCreationResponse::tagList) ?: emptySet(),
        createdAt = data.requireKeys(ArticleCreationResponse::createdAt),
        updatedAt = data.requireKeys(ArticleCreationResponse::updatedAt),
        favorited = data.requireKeys(ArticleCreationResponse::favorited),
        favoritesCount = data.requireKeys(ArticleCreationResponse::favoritesCount),
        author = data.requireKeys(ArticleCreationResponse::author),
    )
}

data class ArticleCreationResponseRoot(val article: ArticleCreationResponse) {
    constructor(article: Article, subject: String) : this(
        ArticleCreationResponse(
            slug = article.slug,
            title = article.title,
            description = article.description,
            body = article.body,
            tagList = article.tagList,
            createdAt = article.createdAt.toHttpFormat(),
            updatedAt = article.updatedAt.toHttpFormat(),
            favorited = false,
            favoritesCount = 0,
            author = subject
        )
    )
}

data class PutArticleRequest(
    val title: String? = null,
    val description: String? = null,
    val body: String? = null,
    val tagList: Set<String> = emptySet()
) {
    constructor(data: Map<*, *>) : this(
        data.keys(PutArticleRequest::title),
        data.keys(PutArticleRequest::description),
        data.keys(PutArticleRequest::body),
        data.keys(PutArticleRequest::tagList) ?: emptySet(),
    )

    fun toFieldsMap(): Map<String, *> =
        fieldsMapOf(
            PutArticleRequest::title to title,
            PutArticleRequest::description to description,
            PutArticleRequest::body to body,
            PutArticleRequest::tagList to tagList,
        )
}

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
) {
    constructor(data: Map<*, *>) : this(
        slug = data.requireKeys(ArticleCreationResponse::slug),
        title = data.requireKeys(ArticleCreationResponse::title),
        description = data.requireKeys(ArticleCreationResponse::description),
        body = data.requireKeys(ArticleCreationResponse::body),
        tagList = data.keys(ArticleCreationResponse::tagList) ?: emptySet(),
        createdAt = data.requireKeys(ArticleCreationResponse::createdAt),
        updatedAt = data.requireKeys(ArticleCreationResponse::updatedAt),
        favorited = data.requireKeys(ArticleCreationResponse::favorited),
        favoritesCount = data.requireKeys(ArticleCreationResponse::favoritesCount),
        author = data.requireKeys(ArticleCreationResponse::author),
    )
}

data class ArticleResponseRoot(val article: ArticleResponse) {
    constructor(article: Article, author: User, user: User?) : this(
        ArticleResponse(
            slug = article.slug,
            title = article.title,
            description = article.description,
            body = article.body,
            tagList = article.tagList,
            createdAt = article.createdAt.toHttpFormat(),
            updatedAt = article.updatedAt.toHttpFormat(),
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
