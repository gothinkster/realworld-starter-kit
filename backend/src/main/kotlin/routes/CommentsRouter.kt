package com.hexagonkt.realworld.routes

import com.hexagonkt.http.server.Router
import com.hexagonkt.realworld.injector
import com.hexagonkt.realworld.messages.CommentRequestRoot
import com.hexagonkt.realworld.messages.CommentResponse
import com.hexagonkt.realworld.messages.CommentResponseRoot
import com.hexagonkt.realworld.messages.CommentsResponseRoot
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.Comment
import com.hexagonkt.realworld.services.User
import com.hexagonkt.store.Store
import kotlin.text.Charsets.UTF_8

internal val commentsRouter = Router {
    val jwt: Jwt = injector.inject()
    val users: Store<User, String> = injector.inject<Store<User, String>>(User::class)
    val articles: Store<Article, String> = injector.inject<Store<Article, String>>(Article::class)

    post {
        val principal = requirePrincipal(jwt)
        val subject = principal.subject
        val slug = pathParameters[Article::slug.name]
        val article = articles.findOne(slug) ?: halt(404, "$slug article not found")
        val author = users.findOne(article.author) ?: halt(404, "${article.author} user not found")
        val user = users.findOne(subject) ?: halt(404, "$subject user not found")
        val commentRequest = request.body<CommentRequestRoot>().comment
        val comment = Comment(
            id = (article.comments.map { it.id }.max() ?: 0) + 1,
            author = subject,
            body = commentRequest.body
        )

        val updated = articles.replaceOne(article.copy(comments = article.comments + comment))

        if (!updated)
            halt(500, "Not updated")

        val content = CommentResponseRoot(CommentResponse(comment, author, user))

        ok(content, charset = UTF_8)
    }

    get {
        val principal = parsePrincipal(jwt)
        val subject = principal?.subject
        val slug = pathParameters[Article::slug.name]
        val article = articles.findOne(slug) ?: halt(404, "$slug article not found")
        val author = users.findOne(article.author) ?: halt(404, "${article.author} user not found")
        val user =
            if (subject != null) users.findOne(subject) ?: halt(404, "$subject user not found")
            else null

        val content = article.comments.map { CommentResponse(it, author, user) }

        ok(CommentsResponseRoot(content), charset = UTF_8)
    }

    delete("/{id}") {
        requirePrincipal(jwt)
        val slug = pathParameters[Article::slug.name]
        val article = articles.findOne(slug) ?: halt(404, "$slug article not found")
        val id = pathParameters[Comment::id.name].toInt()
        val newArticle = article.copy(comments = article.comments.filter { it.id != id })
        val updated = articles.replaceOne(newArticle)

        if (!updated)
            halt(500, "Not updated")

        ok("$id deleted", charset = UTF_8)
    }
}
