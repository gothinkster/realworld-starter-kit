package com.hexagonkt.realworld.routes

import com.hexagonkt.core.media.ApplicationMedia.JSON
import com.hexagonkt.core.require
import com.hexagonkt.core.requireKeys
import com.hexagonkt.http.model.ContentType
import com.hexagonkt.http.server.handlers.path
import com.hexagonkt.realworld.*
import com.hexagonkt.realworld.articles
import com.hexagonkt.realworld.jwt
import com.hexagonkt.realworld.messages.*
import com.hexagonkt.rest.bodyMap
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.Comment
import com.hexagonkt.serialization.serialize
import kotlin.text.Charsets.UTF_8

internal val commentsRouter = path {
    post {
        val principal = parsePrincipal(jwt) ?: return@post unauthorized("Unauthorized")
        val subject = principal.subject
        val slug = pathParameters.require(Article::slug.name)
        val article = articles.findOne(slug) ?: return@post notFound("$slug article not found")
        val author = users.findOne(article.author) ?: return@post notFound("${article.author} user not found")
        val user = users.findOne(subject) ?: return@post notFound("$subject user not found")
        val commentRequest = CommentRequest(request.bodyMap().requireKeys<Map<String, Any>>("comment"))
        val comment = Comment(
            id = (article.comments.maxOfOrNull { it.id } ?: 0) + 1,
            author = subject,
            body = commentRequest.body
        )

        val updated = articles.replaceOne(article.copy(comments = article.comments + comment))

        if (!updated)
            return@post internalServerError("Not updated")

        val content = mapOf("comment" to CommentResponse(comment, author, user))

        ok(content.serialize(JSON), contentType = ContentType(JSON, charset = UTF_8))
    }

    get {
        val principal = parsePrincipal(jwt)
        val subject = principal?.subject
        val slug = pathParameters.require(Article::slug.name)
        val article = articles.findOne(slug) ?: return@get notFound("$slug article not found")
        val author = users.findOne(article.author) ?: return@get notFound("${article.author} user not found")
        val user =
            if (subject != null) users.findOne(subject) ?: return@get notFound("$subject user not found")
            else null

        val content = article.comments.map { CommentResponse(it, author, user) }

        ok(mapOf("comments" to content).serialize(JSON), contentType = ContentType(JSON, charset = UTF_8))
    }

    delete("/{id}") {
        parsePrincipal(jwt) ?: return@delete unauthorized("Unauthorized")
        val slug = pathParameters.require(Article::slug.name)
        val article = articles.findOne(slug) ?: return@delete notFound("$slug article not found")
        val id = pathParameters.require(Comment::id.name).toInt()
        val newArticle = article.copy(comments = article.comments.filter { it.id != id })
        val updated = articles.replaceOne(newArticle)

        if (!updated)
            return@delete internalServerError("Not updated")

        ok(OkResponse("$id deleted").serialize(JSON), contentType = ContentType(JSON, charset = UTF_8))
    }
}
