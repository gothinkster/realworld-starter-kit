package com.hexagonkt.realworld.messages

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL
import com.hexagonkt.core.fieldsMapOf
import com.hexagonkt.core.keys
import com.hexagonkt.core.requireKeys
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
        data.requireKeys("article", ArticleRequest::title),
        data.requireKeys("article", ArticleRequest::description),
        data.requireKeys("article", ArticleRequest::body),
        data.requireKeys("article", ArticleRequest::tagList),
    )
}

@JsonInclude(NON_NULL)
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
        data.keys("article", PutArticleRequest::title),
        data.keys("article", PutArticleRequest::description),
        data.keys("article", PutArticleRequest::body),
        data.keys("article", PutArticleRequest::tagList) ?: emptySet(),
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
)

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
