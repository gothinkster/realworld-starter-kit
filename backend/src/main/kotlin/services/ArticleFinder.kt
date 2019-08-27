package com.hexagonkt.realworld.services

interface ArticleFinder {
    fun findMany(author: String, tag: String, favorited: String, limit: Int?, offset: Int?):
        List<Article>
}
