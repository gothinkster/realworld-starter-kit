package com.example.article

import com.example.api.model.Profile
import com.example.jooq.public.tables.references.ARTICLES
import com.example.jooq.public.tables.references.ARTICLE_TAGS
import com.example.jooq.public.tables.references.FAVORITES
import com.example.jooq.public.tables.references.FOLLOWERS
import com.example.jooq.public.tables.references.TAGS
import com.example.jooq.public.tables.references.USERS
import com.example.shared.exceptions.NotFoundException
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import org.jooq.Condition
import org.jooq.DSLContext
import org.jooq.Field
import org.jooq.Record
import org.jooq.impl.DSL.count
import org.jooq.impl.DSL.multiset
import org.jooq.impl.DSL.select
import com.example.api.model.Article as ApiArticle

@ApplicationScoped
class JooqArticleQueries : ArticleQueries {
    @Inject
    lateinit var dsl: DSLContext

    override fun getArticleBySlug(
        slug: String,
        viewerId: Long?,
    ): ApiArticle {
        val record =
            dsl
                .select(articleFields(viewerId))
                .from(ARTICLES)
                .join(USERS)
                .on(USERS.ID.eq(ARTICLES.AUTHOR_ID))
                .where(ARTICLES.SLUG.eq(slug))
                .fetchOne() ?: throw NotFoundException("Article not found")

        return record.toApiArticle()
    }

    override fun getArticles(
        tag: String?,
        author: String?,
        favorited: String?,
        limit: Int,
        offset: Int,
        viewerId: Long?,
    ): List<ApiArticle> =
        dsl
            .select(articleFields(viewerId))
            .from(ARTICLES)
            .join(USERS)
            .on(USERS.ID.eq(ARTICLES.AUTHOR_ID))
            .where(buildConditions(tag, author, favorited))
            .orderBy(ARTICLES.CREATED_AT.desc())
            .limit(limit)
            .offset(offset)
            .fetch()
            .map { it.toApiArticle() }

    private fun buildConditions(
        tag: String?,
        author: String?,
        favorited: String?,
    ): List<Condition> {
        val conditions = mutableListOf<Condition>()

        tag?.let {
            conditions.add(
                ARTICLES.ID.`in`(
                    select(ARTICLE_TAGS.ARTICLE_ID)
                        .from(ARTICLE_TAGS)
                        .join(TAGS)
                        .on(TAGS.ID.eq(ARTICLE_TAGS.TAG_ID))
                        .where(TAGS.NAME.eq(it)),
                ),
            )
        }

        author?.let {
            conditions.add(
                ARTICLES.AUTHOR_ID.`in`(
                    select(USERS.ID)
                        .from(USERS)
                        .where(USERS.USERNAME.eq(it)),
                ),
            )
        }

        favorited?.let {
            conditions.add(
                ARTICLES.ID.`in`(
                    select(FAVORITES.ARTICLE_ID)
                        .from(FAVORITES)
                        .join(USERS)
                        .on(USERS.ID.eq(FAVORITES.USER_ID))
                        .where(USERS.USERNAME.eq(it)),
                ),
            )
        }

        return conditions
    }

    override fun getArticlesFeed(
        limit: Int,
        offset: Int,
        viewerId: Long,
    ): List<ApiArticle> =
        dsl
            .select(articleFields(viewerId))
            .from(ARTICLES)
            .join(USERS)
            .on(USERS.ID.eq(ARTICLES.AUTHOR_ID))
            .where(
                ARTICLES.AUTHOR_ID.`in`(
                    select(FOLLOWERS.FOLLOWEE_ID)
                        .from(FOLLOWERS)
                        .where(FOLLOWERS.FOLLOWER_ID.eq(viewerId)),
                ),
            ).orderBy(ARTICLES.CREATED_AT.desc())
            .limit(limit)
            .offset(offset)
            .fetch()
            .map { it.toApiArticle() }

    override fun countArticles(
        tag: String?,
        author: String?,
        favorited: String?,
    ): Int =
        dsl
            .selectCount()
            .from(ARTICLES)
            .where(buildConditions(tag, author, favorited))
            .fetchOne(0, Int::class.java) ?: 0

    override fun countArticlesFeed(viewerId: Long): Int =
        dsl
            .selectCount()
            .from(ARTICLES)
            .where(
                ARTICLES.AUTHOR_ID.`in`(
                    select(FOLLOWERS.FOLLOWEE_ID)
                        .from(FOLLOWERS)
                        .where(FOLLOWERS.FOLLOWER_ID.eq(viewerId)),
                ),
            ).fetchOne(0, Int::class.java) ?: 0

    private fun articleFields(viewerId: Long?): List<Field<*>> {
        val favoritedField =
            if (viewerId != null) {
                select(count())
                    .from(FAVORITES)
                    .where(FAVORITES.ARTICLE_ID.eq(ARTICLES.ID))
                    .and(FAVORITES.USER_ID.eq(viewerId))
                    .asField<Int>("favorited")
            } else {
                org.jooq.impl.DSL
                    .`val`(0)
                    .`as`("favorited")
            }

        val followingField =
            if (viewerId != null) {
                select(count())
                    .from(FOLLOWERS)
                    .where(FOLLOWERS.FOLLOWEE_ID.eq(ARTICLES.AUTHOR_ID))
                    .and(FOLLOWERS.FOLLOWER_ID.eq(viewerId))
                    .asField<Int>("following")
            } else {
                org.jooq.impl.DSL
                    .`val`(0)
                    .`as`("following")
            }

        return listOf(
            ARTICLES.ID,
            ARTICLES.SLUG,
            ARTICLES.TITLE,
            ARTICLES.DESCRIPTION,
            ARTICLES.BODY,
            ARTICLES.AUTHOR_ID,
            ARTICLES.CREATED_AT,
            ARTICLES.UPDATED_AT,
            USERS.USERNAME,
            USERS.BIO,
            USERS.IMAGE,
            multiset(
                select(TAGS.NAME)
                    .from(TAGS)
                    .join(ARTICLE_TAGS)
                    .on(ARTICLE_TAGS.TAG_ID.eq(TAGS.ID))
                    .where(ARTICLE_TAGS.ARTICLE_ID.eq(ARTICLES.ID)),
            ).`as`("tags").convertFrom { it.map { r -> r.value1() } },
            select(count())
                .from(FAVORITES)
                .where(FAVORITES.ARTICLE_ID.eq(ARTICLES.ID))
                .asField<Int>("favoritesCount"),
            favoritedField,
            followingField,
        )
    }

    private fun Record.toApiArticle(): ApiArticle =
        ApiArticle()
            .slug(get(ARTICLES.SLUG))
            .title(get(ARTICLES.TITLE))
            .description(get(ARTICLES.DESCRIPTION))
            .body(get(ARTICLES.BODY))
            .tagList(
                @Suppress("UNCHECKED_CAST")
                (get("tags") as? List<String> ?: emptyList()),
            ).createdAt(get(ARTICLES.CREATED_AT))
            .updatedAt(get(ARTICLES.UPDATED_AT))
            .favorited(get("favorited", Int::class.java) > 0)
            .favoritesCount(get("favoritesCount", Int::class.java))
            .author(
                Profile()
                    .username(get(USERS.USERNAME))
                    .bio(get(USERS.BIO))
                    .image(get(USERS.IMAGE))
                    .following(get("following", Int::class.java) > 0),
            )
}
