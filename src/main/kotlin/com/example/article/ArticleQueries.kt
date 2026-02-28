package com.example.article

import com.example.shared.domain.Queries
import com.example.api.model.Article as ApiArticle

interface ArticleQueries : Queries {
    fun getArticleBySlug(
        slug: String,
        viewerId: Long? = null,
    ): ApiArticle

    fun getArticles(
        tag: String? = null,
        author: String? = null,
        favorited: String? = null,
        limit: Int = 20,
        offset: Int = 0,
        viewerId: Long? = null,
    ): List<ApiArticle>

    fun getArticlesFeed(
        limit: Int = 20,
        offset: Int = 0,
        viewerId: Long,
    ): List<ApiArticle>

    fun countArticles(
        tag: String? = null,
        author: String? = null,
        favorited: String? = null,
    ): Int

    fun countArticlesFeed(viewerId: Long): Int
}
