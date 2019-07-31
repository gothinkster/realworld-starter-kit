package com.hexagonkt.realworld

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL

data class RegistrationRequest(
    val email: String,
    val username: String,
    val password: String
)

data class WrappedRegistrationRequest(val user: RegistrationRequest)

@JsonInclude(NON_NULL)
data class UserResponse(
    val email: String,
    val username: String,
    val bio: String,
    val image: String,
    val token: String
)

data class WrappedUserResponse(val user: UserResponse)

data class LoginRequest(
    val email: String,
    val password: String
)

data class WrappedLoginRequest(val user: LoginRequest)

@JsonInclude(NON_NULL)
data class PutUserRequest(
    val email: String?,
    val password: String?,
    val bio: String?,
    val image: String?
)
data class WrappedPutUserRequest(val user: PutUserRequest)

@JsonInclude(NON_NULL)
data class ProfileResponse(
    val username: String,
    val bio: String?,
    val image: String?,
    val following: Boolean
)

data class WrappedProfileResponse(val profile: ProfileResponse)

data class ArticleRequest(
    val title: String,
    val description: String,
    val body: String,
    val tagList: Set<String>
)

data class WrappedArticleRequest(val article: ArticleRequest)

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

data class WrappedArticleCreationResponse(val article: ArticleCreationResponse)

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

data class WrappedArticlesResponse(
    val articles: List<ArticleResponse>,
    val articlesCount: Int
)
