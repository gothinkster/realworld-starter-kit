package com.hexagonkt.realworld.routes

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL

data class RegistrationRequest(
    val email: String,
    val username: String,
    val password: String
)

data class RegistrationRequestRoot(val user: RegistrationRequest)

@JsonInclude(NON_NULL)
data class UserResponse(
    val email: String,
    val username: String,
    val bio: String,
    val image: String,
    val token: String
)

data class UserResponseRoot(val user: UserResponse)

data class LoginRequest(
    val email: String,
    val password: String
)

data class LoginRequestRoot(val user: LoginRequest)

data class PutUserRequest(
    val email: String? = null,
    val password: String? = null,
    val bio: String? = null,
    val image: String? = null
)
data class PutUserRequestRoot(val user: PutUserRequest)

@JsonInclude(NON_NULL)
data class ProfileResponse(
    val username: String,
    val bio: String,
    val image: String,
    val following: Boolean
)

data class ProfileResponseRoot(val profile: ProfileResponse)

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

data class ArticleCreationResponseRoot(val article: ArticleCreationResponse)

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

data class ArticlesResponseRoot(
    val articles: List<ArticleResponse>,
    val articlesCount: Long
)
