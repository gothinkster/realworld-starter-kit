package com.hexagonkt.realworld.routes

import com.hexagonkt.core.media.ApplicationMedia.JSON
import com.hexagonkt.core.require
import com.hexagonkt.http.model.ContentType
import com.hexagonkt.http.server.handlers.path
import com.hexagonkt.realworld.createArticleStore
import com.hexagonkt.realworld.createJwt
import com.hexagonkt.realworld.createUserStore
import com.hexagonkt.realworld.messages.*
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.Comment
import com.hexagonkt.realworld.services.User
import com.hexagonkt.store.Store
import kotlin.text.Charsets.UTF_8

internal val commentsRouter = path {
    val jwt: Jwt = createJwt()
    val users: Store<User, String> = createUserStore()
    val articles: Store<Article, String> = createArticleStore()

    post {
        val principal = requirePrincipal(jwt)
        val subject = principal.subject
        val slug = pathParameters.require(Article::slug.name)
        val article = articles.findOne(slug) ?: return@post notFound("$slug article not found")
        val author = users.findOne(article.author) ?: return@post notFound("${article.author} user not found")
        val user = users.findOne(subject) ?: return@post notFound("$subject user not found")
        val commentRequest = request.body<CommentRequestRoot>().comment
        val comment = Comment(
            id = (article.comments.maxOf { it.id }) + 1,
            author = subject,
            body = commentRequest.body
        )

        val updated = articles.replaceOne(article.copy(comments = article.comments + comment))

        if (!updated)
            return@post internalServerError("Not updated")

        val content = CommentResponseRoot(CommentResponse(comment, author, user))

        ok(content, contentType = ContentType(JSON, charset = UTF_8))
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

        ok(CommentsResponseRoot(content), contentType = ContentType(JSON, charset = UTF_8))
    }

    delete("/{id}") {
        requirePrincipal(jwt)
        val slug = pathParameters.require(Article::slug.name)
        val article = articles.findOne(slug) ?: return@delete notFound("$slug article not found")
        val id = pathParameters.require(Comment::id.name).toInt()
        val newArticle = article.copy(comments = article.comments.filter { it.id != id })
        val updated = articles.replaceOne(newArticle)

        if (!updated)
            return@delete internalServerError("Not updated")

        ok(OkResponse("$id deleted"), contentType = ContentType(JSON, charset = UTF_8))
    }
}
