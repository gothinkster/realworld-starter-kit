package com.hexagonkt.realworld.routes

import com.hexagonkt.core.media.ApplicationMedia.JSON
import com.hexagonkt.http.model.ContentType
import com.hexagonkt.http.server.handlers.path
import com.hexagonkt.realworld.createArticleStore
import com.hexagonkt.realworld.messages.TagsResponseRoot
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.serialization.serialize
import com.hexagonkt.store.Store
import kotlin.text.Charsets.UTF_8

internal val tagsRouter by lazy {
    path {
        val articles: Store<Article, String> = createArticleStore()

        get {
            val field = Article::tagList.name
            val tags = articles.findAll(listOf(field))
                .flatMap {
                    it[field]?.let { tags ->
                        if (tags is Collection<*>)
                            tags.map { tag -> tag.toString() }
                        else
                            null
                    } ?: emptyList()
                }
                .distinct()

            ok(TagsResponseRoot(tags).serialize(JSON), contentType = ContentType(JSON, charset = UTF_8))
        }
    }
}
