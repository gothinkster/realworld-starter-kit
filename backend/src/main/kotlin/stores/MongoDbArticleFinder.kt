package com.hexagonkt.realworld.stores

import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.ArticleFinder

class MongoDbArticleFinder: ArticleFinder {
    override fun findMany(
        author: String, tag: String, favorited: String, limit: Int?, offset: Int?): List<Article> {

        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
}
