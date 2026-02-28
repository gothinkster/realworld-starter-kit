package com.example.article

import com.example.shared.exceptions.ForbiddenException
import com.example.shared.exceptions.NotFoundException
import com.example.shared.security.SecurityContext
import com.example.shared.utils.SlugGenerator
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import kotlin.test.assertEquals

class ArticleServiceTest {
    private lateinit var articleService: ArticleService
    private lateinit var articleRepository: ArticleRepository
    private lateinit var slugGenerator: SlugGenerator
    private lateinit var securityContext: SecurityContext

    @BeforeEach
    fun setup() {
        articleRepository = mockk()
        slugGenerator = mockk()
        securityContext = mockk()
        articleService = ArticleService()
        articleService.articleRepository = articleRepository
        articleService.slugGenerator = slugGenerator
        articleService.securityContext = securityContext
    }

    @Test
    fun `createArticle should generate slug and save article`() {
        val userId = 1L
        val title = "Test Article"
        val description = "Test description"
        val body = "Test body"
        val tags = listOf("tag1", "tag2")
        val generatedSlug = "test-article"

        every { securityContext.requireCurrentUserId() } returns userId

        every {
            slugGenerator.generateUniqueSlug(
                title = title,
                existingSlugChecker = any(),
            )
        } returns generatedSlug

        val expectedArticle =
            Article(
                id = 1L,
                slug = generatedSlug,
                title = title,
                description = description,
                body = body,
                authorId = userId,
                tags = tags.toSet(),
            )

        every { articleRepository.create(any()) } returns expectedArticle

        val result = articleService.createArticle(title, description, body, tags)

        assertEquals(expectedArticle, result)
        verify { slugGenerator.generateUniqueSlug(title = title, existingSlugChecker = any()) }
        verify { articleRepository.create(any()) }
    }

    @Test
    fun `updateArticle should update all fields when provided`() {
        val userId = 1L
        val originalSlug = "original-slug"
        val newTitle = "New Title"
        val newDescription = "New description"
        val newBody = "New body"
        val newSlug = "new-title"

        every { securityContext.requireCurrentUserId() } returns userId

        val existingArticle =
            Article(
                id = 1L,
                slug = originalSlug,
                title = "Original Title",
                description = "Original description",
                body = "Original body",
                authorId = userId,
            )

        every { articleRepository.findBySlug(originalSlug) } returns existingArticle
        every {
            slugGenerator.generateUniqueSlug(
                title = newTitle,
                existingSlugChecker = any(),
            )
        } returns newSlug

        val updatedArticle =
            existingArticle.update(
                slug = newSlug,
                title = newTitle,
                description = newDescription,
                body = newBody,
            )

        every { articleRepository.update(any()) } returns updatedArticle

        val result = articleService.updateArticle(originalSlug, newTitle, newDescription, newBody)

        assertEquals(updatedArticle, result)
        verify { articleRepository.findBySlug(originalSlug) }
        verify { slugGenerator.generateUniqueSlug(title = newTitle, existingSlugChecker = any()) }
        verify { articleRepository.update(any()) }
    }

    @Test
    fun `updateArticle should keep existing values when null provided`() {
        val userId = 1L
        val slug = "test-slug"

        every { securityContext.requireCurrentUserId() } returns userId

        val existingArticle =
            Article(
                id = 1L,
                slug = slug,
                title = "Original Title",
                description = "Original description",
                body = "Original body",
                authorId = userId,
            )

        every { articleRepository.findBySlug(slug) } returns existingArticle

        val updatedArticle =
            existingArticle.update(
                slug = slug,
                title = existingArticle.title,
                description = existingArticle.description,
                body = existingArticle.body,
            )

        every { articleRepository.update(any()) } returns updatedArticle

        val result = articleService.updateArticle(slug, null, null, null)

        assertEquals(updatedArticle, result)
        verify { articleRepository.findBySlug(slug) }
        verify(exactly = 0) { slugGenerator.generateUniqueSlug(any(), any()) }
        verify { articleRepository.update(any()) }
    }

    @Test
    fun `updateArticle should throw NotFoundException when article not found`() {
        val userId = 1L
        val slug = "non-existent"

        every { securityContext.requireCurrentUserId() } returns userId
        every { articleRepository.findBySlug(slug) } returns null

        assertThrows<NotFoundException> {
            articleService.updateArticle(slug, "New Title", null, null)
        }
    }

    @Test
    fun `updateArticle should throw ForbiddenException when user is not author`() {
        val userId = 1L
        val differentUserId = 2L
        val slug = "test-slug"

        every { securityContext.requireCurrentUserId() } returns userId

        val existingArticle =
            Article(
                id = 1L,
                slug = slug,
                title = "Test Article",
                description = "Test description",
                body = "Test body",
                authorId = differentUserId,
            )

        every { articleRepository.findBySlug(slug) } returns existingArticle

        assertThrows<ForbiddenException> {
            articleService.updateArticle(slug, "New Title", null, null)
        }
    }

    @Test
    fun `deleteArticle should delete when user is author`() {
        val userId = 1L
        val slug = "test-slug"

        every { securityContext.requireCurrentUserId() } returns userId

        val article =
            Article(
                id = 1L,
                slug = slug,
                title = "Test Article",
                description = "Test description",
                body = "Test body",
                authorId = userId,
            )

        every { articleRepository.findBySlug(slug) } returns article
        every { articleRepository.deleteById(1L) } returns Unit

        articleService.deleteArticle(slug)

        verify { articleRepository.findBySlug(slug) }
        verify { articleRepository.deleteById(1L) }
    }

    @Test
    fun `deleteArticle should throw NotFoundException when article not found`() {
        val userId = 1L
        val slug = "non-existent"

        every { securityContext.requireCurrentUserId() } returns userId
        every { articleRepository.findBySlug(slug) } returns null

        assertThrows<NotFoundException> {
            articleService.deleteArticle(slug)
        }
    }

    @Test
    fun `deleteArticle should throw ForbiddenException when user is not author`() {
        val userId = 1L
        val differentUserId = 2L
        val slug = "test-slug"

        every { securityContext.requireCurrentUserId() } returns userId

        val article =
            Article(
                id = 1L,
                slug = slug,
                title = "Test Article",
                description = "Test description",
                body = "Test body",
                authorId = differentUserId,
            )

        every { articleRepository.findBySlug(slug) } returns article

        assertThrows<ForbiddenException> {
            articleService.deleteArticle(slug)
        }
    }

    @Test
    fun `favoriteArticle should call repository favorite`() {
        val userId = 1L
        val slug = "test-slug"

        every { securityContext.requireCurrentUserId() } returns userId

        val article =
            Article(
                id = 1L,
                slug = slug,
                title = "Test Article",
                description = "Test description",
                body = "Test body",
                authorId = 2L,
            )

        every { articleRepository.findBySlug(slug) } returns article
        every { articleRepository.favorite(1L, userId) } returns Unit

        articleService.favoriteArticle(slug)

        verify { articleRepository.findBySlug(slug) }
        verify { articleRepository.favorite(1L, userId) }
    }

    @Test
    fun `favoriteArticle should throw NotFoundException when article not found`() {
        val userId = 1L
        val slug = "non-existent"

        every { securityContext.requireCurrentUserId() } returns userId
        every { articleRepository.findBySlug(slug) } returns null

        assertThrows<NotFoundException> {
            articleService.favoriteArticle(slug)
        }
    }

    @Test
    fun `unfavoriteArticle should call repository unfavorite`() {
        val userId = 1L
        val slug = "test-slug"

        every { securityContext.requireCurrentUserId() } returns userId

        val article =
            Article(
                id = 1L,
                slug = slug,
                title = "Test Article",
                description = "Test description",
                body = "Test body",
                authorId = 2L,
            )

        every { articleRepository.findBySlug(slug) } returns article
        every { articleRepository.unfavorite(1L, userId) } returns Unit

        articleService.unfavoriteArticle(slug)

        verify { articleRepository.findBySlug(slug) }
        verify { articleRepository.unfavorite(1L, userId) }
    }

    @Test
    fun `getArticle should return article when found`() {
        val slug = "test-slug"

        val article =
            Article(
                id = 1L,
                slug = slug,
                title = "Test Article",
                description = "Test description",
                body = "Test body",
                authorId = 1L,
            )

        every { articleRepository.findBySlug(slug) } returns article

        val result = articleService.getArticle(slug)

        assertEquals(article, result)
        verify { articleRepository.findBySlug(slug) }
    }

    @Test
    fun `getArticle should throw NotFoundException when article not found`() {
        val slug = "non-existent"

        every { articleRepository.findBySlug(slug) } returns null

        assertThrows<NotFoundException> {
            articleService.getArticle(slug)
        }
    }

    @Test
    fun `getAllTags should return tags from repository`() {
        val tags = listOf("tag1", "tag2", "tag3")

        every { articleRepository.getAllTags() } returns tags

        val result = articleService.getAllTags()

        assertEquals(tags, result)
        verify { articleRepository.getAllTags() }
    }
}
