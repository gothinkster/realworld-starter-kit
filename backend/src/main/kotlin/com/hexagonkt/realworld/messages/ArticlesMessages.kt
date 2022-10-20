package com.hexagonkt.realworld.messages

import com.hexagonkt.core.*
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

data class AuthorResponse(
    val username: String,
    val bio: String,
    val image: String,
    val following: Boolean
) {
    constructor(data: Map<*, *>) : this(
        username = data.requireString(AuthorResponse::username),
        bio = data.requireString(AuthorResponse::bio),
        image = data.requireString(AuthorResponse::image),
        following = data.requireBoolean(AuthorResponse::following),
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
        slug = data.requireString(ArticleCreationResponse::slug),
        title = data.requireString(ArticleCreationResponse::title),
        description = data.requireString(ArticleCreationResponse::description),
        body = data.requireString(ArticleCreationResponse::body),
        tagList = data.getStringsOrEmpty(ArticleCreationResponse::tagList).toSet(),
        createdAt = data.requireString(ArticleCreationResponse::createdAt),
        updatedAt = data.requireString(ArticleCreationResponse::updatedAt),
        favorited = data.requireBoolean(ArticleCreationResponse::favorited),
        favoritesCount = data.requireInt(ArticleCreationResponse::favoritesCount),
        author = data.requireString(ArticleCreationResponse::author),
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
            createdAt = article.createdAt.toUtc(),
            updatedAt = article.updatedAt.toUtc(),
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
        data.getString(PutArticleRequest::title),
        data.getString(PutArticleRequest::description),
        data.getString(PutArticleRequest::body),
        data.getStringsOrEmpty(PutArticleRequest::tagList).toSet(),
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
        slug = data.requireString(ArticleCreationResponse::slug),
        title = data.requireString(ArticleCreationResponse::title),
        description = data.requireString(ArticleCreationResponse::description),
        body = data.requireString(ArticleCreationResponse::body),
        tagList = data.getStringsOrEmpty(ArticleCreationResponse::tagList).toSet(),
        createdAt = data.requireString(ArticleCreationResponse::createdAt),
        updatedAt = data.requireString(ArticleCreationResponse::updatedAt),
        favorited = data.requireBoolean(ArticleCreationResponse::favorited),
        favoritesCount = data.requireInt(ArticleCreationResponse::favoritesCount),
        author = data.requireMap(ArticleCreationResponse::author).let(::AuthorResponse),
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
            createdAt = article.createdAt.toUtc(),
            updatedAt = article.updatedAt.toUtc(),
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

data class ArticlesResponseRoot(
    val articles: List<ArticleResponse>,
    val articlesCount: Long
)
