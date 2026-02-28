package com.example.article

import com.example.jooq.public.tables.references.ARTICLES
import com.example.jooq.public.tables.references.ARTICLE_TAGS
import com.example.jooq.public.tables.references.FAVORITES
import com.example.jooq.public.tables.references.TAGS
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import org.jooq.DSLContext

@ApplicationScoped
class JooqArticleRepository : ArticleRepository {
    @Inject
    lateinit var dsl: DSLContext

    override fun create(entity: Article): Article {
        require(entity.id == null) { "Cannot create entity with existing ID" }

        val id =
            dsl
                .insertInto(ARTICLES)
                .set(ARTICLES.SLUG, entity.slug)
                .set(ARTICLES.TITLE, entity.title)
                .set(ARTICLES.DESCRIPTION, entity.description)
                .set(ARTICLES.BODY, entity.body)
                .set(ARTICLES.AUTHOR_ID, entity.authorId)
                .set(ARTICLES.CREATED_AT, entity.createdAt)
                .set(ARTICLES.UPDATED_AT, entity.updatedAt)
                .returningResult(ARTICLES.ID)
                .fetchOne()
                ?.value1() ?: error("Failed to insert article")

        saveTags(id, entity.tags)

        return entity.withId(id)
    }

    override fun update(entity: Article): Article {
        requireNotNull(entity.id) { "Cannot update entity without ID" }

        dsl
            .update(ARTICLES)
            .set(ARTICLES.SLUG, entity.slug)
            .set(ARTICLES.TITLE, entity.title)
            .set(ARTICLES.DESCRIPTION, entity.description)
            .set(ARTICLES.BODY, entity.body)
            .set(ARTICLES.UPDATED_AT, entity.updatedAt)
            .where(ARTICLES.ID.eq(entity.id))
            .execute()

        dsl
            .deleteFrom(ARTICLE_TAGS)
            .where(ARTICLE_TAGS.ARTICLE_ID.eq(entity.id))
            .execute()

        saveTags(entity.id, entity.tags)

        return entity
    }

    private fun saveTags(
        articleId: Long,
        tags: Set<String>,
    ) {
        if (tags.isEmpty()) return

        // First, ensure all tags exist (batch upsert)
        val tagInserts =
            tags.map { tagName ->
                dsl
                    .insertInto(TAGS)
                    .set(TAGS.NAME, tagName)
                    .onConflict(TAGS.NAME)
                    .doUpdate()
                    .set(TAGS.NAME, tagName)
            }
        dsl.batch(tagInserts).execute()

        // Get all tag IDs in a single query
        val tagIds =
            dsl
                .select(TAGS.ID, TAGS.NAME)
                .from(TAGS)
                .where(TAGS.NAME.`in`(tags))
                .fetch()
                .associate { it.value2()!! to it.value1()!! }

        // Batch insert article_tags relationships
        val articleTagInserts =
            tags.mapNotNull { tagName ->
                tagIds[tagName]?.let { tagId ->
                    dsl
                        .insertInto(ARTICLE_TAGS)
                        .set(ARTICLE_TAGS.ARTICLE_ID, articleId)
                        .set(ARTICLE_TAGS.TAG_ID, tagId)
                        .onConflict(ARTICLE_TAGS.ARTICLE_ID, ARTICLE_TAGS.TAG_ID)
                        .doNothing()
                }
            }
        if (articleTagInserts.isNotEmpty()) {
            dsl.batch(articleTagInserts).execute()
        }
    }

    override fun findById(id: Long): Article? {
        val result =
            dsl
                .select(
                    ARTICLES.asterisk(),
                    org.jooq.impl.DSL
                        .multiset(
                            dsl
                                .select(TAGS.NAME)
                                .from(TAGS)
                                .join(ARTICLE_TAGS)
                                .on(ARTICLE_TAGS.TAG_ID.eq(TAGS.ID))
                                .where(ARTICLE_TAGS.ARTICLE_ID.eq(ARTICLES.ID)),
                        ).`as`("tags")
                        .convertFrom { it.map { r -> r.value1() } },
                ).from(ARTICLES)
                .where(ARTICLES.ID.eq(id))
                .fetchOne() ?: return null

        val record = result.into(ARTICLES)

        @Suppress("UNCHECKED_CAST")
        val tags = result.get("tags") as? List<String> ?: emptyList()

        return Article(
            id = record.id,
            slug = record.slug!!,
            title = record.title!!,
            description = record.description!!,
            body = record.body!!,
            authorId = record.authorId!!,
            tags = tags.toSet(),
            createdAt = record.createdAt!!,
            updatedAt = record.updatedAt!!,
        )
    }

    override fun findBySlug(slug: String): Article? {
        val result =
            dsl
                .select(
                    ARTICLES.asterisk(),
                    org.jooq.impl.DSL
                        .multiset(
                            dsl
                                .select(TAGS.NAME)
                                .from(TAGS)
                                .join(ARTICLE_TAGS)
                                .on(ARTICLE_TAGS.TAG_ID.eq(TAGS.ID))
                                .where(ARTICLE_TAGS.ARTICLE_ID.eq(ARTICLES.ID)),
                        ).`as`("tags")
                        .convertFrom { it.map { r -> r.value1() } },
                ).from(ARTICLES)
                .where(ARTICLES.SLUG.eq(slug))
                .fetchOne() ?: return null

        val record = result.into(ARTICLES)

        @Suppress("UNCHECKED_CAST")
        val tags = result.get("tags") as? List<String> ?: emptyList()

        return Article(
            id = record.id,
            slug = record.slug!!,
            title = record.title!!,
            description = record.description!!,
            body = record.body!!,
            authorId = record.authorId!!,
            tags = tags.toSet(),
            createdAt = record.createdAt!!,
            updatedAt = record.updatedAt!!,
        )
    }

    override fun deleteById(id: Long) {
        dsl.deleteFrom(ARTICLES).where(ARTICLES.ID.eq(id)).execute()
    }

    override fun favorite(
        articleId: Long,
        userId: Long,
    ) {
        dsl
            .insertInto(FAVORITES)
            .set(FAVORITES.ARTICLE_ID, articleId)
            .set(FAVORITES.USER_ID, userId)
            .onDuplicateKeyIgnore()
            .execute()
    }

    override fun unfavorite(
        articleId: Long,
        userId: Long,
    ) {
        dsl
            .deleteFrom(FAVORITES)
            .where(FAVORITES.ARTICLE_ID.eq(articleId))
            .and(FAVORITES.USER_ID.eq(userId))
            .execute()
    }

    override fun isFavorited(
        articleId: Long,
        userId: Long,
    ): Boolean =
        dsl.fetchExists(
            dsl
                .selectFrom(FAVORITES)
                .where(FAVORITES.ARTICLE_ID.eq(articleId))
                .and(FAVORITES.USER_ID.eq(userId)),
        )

    override fun getAllTags(): List<String> =
        dsl
            .select(TAGS.NAME)
            .from(TAGS)
            .orderBy(TAGS.NAME)
            .fetch()
            .mapNotNull { it.value1() }
}
