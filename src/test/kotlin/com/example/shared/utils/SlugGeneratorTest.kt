package com.example.shared.utils

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class SlugGeneratorTest {
    private val slugGenerator = SlugGenerator()

    @Test
    fun `should generate simple slug from title`() {
        val slug =
            slugGenerator.generateUniqueSlug(
                title = "Hello World",
                existingSlugChecker = { false },
            )

        assertEquals("hello-world", slug)
    }

    @Test
    fun `should handle special characters`() {
        val slug =
            slugGenerator.generateUniqueSlug(
                title = "Hello! World? #Test",
                existingSlugChecker = { false },
            )

        assertEquals("hello-world-test", slug)
    }

    @Test
    fun `should handle accented characters`() {
        val slug =
            slugGenerator.generateUniqueSlug(
                title = "Café Français",
                existingSlugChecker = { false },
            )

        assertEquals("cafe-francais", slug)
    }

    @Test
    fun `should collapse multiple spaces`() {
        val slug =
            slugGenerator.generateUniqueSlug(
                title = "Hello    World    Test",
                existingSlugChecker = { false },
            )

        assertEquals("hello-world-test", slug)
    }

    @Test
    fun `should collapse multiple dashes`() {
        val slug =
            slugGenerator.generateUniqueSlug(
                title = "Hello---World",
                existingSlugChecker = { false },
            )

        assertEquals("hello-world", slug)
    }

    @Test
    fun `should trim spaces`() {
        val slug =
            slugGenerator.generateUniqueSlug(
                title = "  Hello World  ",
                existingSlugChecker = { false },
            )

        assertEquals("hello-world", slug)
    }

    @Test
    fun `should generate unique slug with counter when slug exists`() {
        val existingSlugs = mutableSetOf("hello-world")

        val slug =
            slugGenerator.generateUniqueSlug(
                title = "Hello World",
                existingSlugChecker = { it in existingSlugs },
            )

        assertEquals("hello-world-2", slug)
    }

    @Test
    fun `should increment counter until unique slug found`() {
        val existingSlugs = mutableSetOf("hello-world", "hello-world-2", "hello-world-3")

        val slug =
            slugGenerator.generateUniqueSlug(
                title = "Hello World",
                existingSlugChecker = { it in existingSlugs },
            )

        assertEquals("hello-world-4", slug)
    }

    @Test
    fun `should handle titles with numbers`() {
        val slug =
            slugGenerator.generateUniqueSlug(
                title = "Kotlin 2.0 Release",
                existingSlugChecker = { false },
            )

        assertEquals("kotlin-20-release", slug)
    }

    @Test
    fun `should handle mixed case`() {
        val slug =
            slugGenerator.generateUniqueSlug(
                title = "MiXeD CaSe TiTlE",
                existingSlugChecker = { false },
            )

        assertEquals("mixed-case-title", slug)
    }

    @Test
    fun `should handle emoji and unicode`() {
        val slug =
            slugGenerator.generateUniqueSlug(
                title = "Hello 🌍 World",
                existingSlugChecker = { false },
            )

        assertEquals("hello-world", slug)
    }

    @Test
    fun `should throw exception when max attempts exhausted`() {
        val exception =
            assertThrows<IllegalStateException> {
                slugGenerator.generateUniqueSlug(
                    title = "Hello World",
                    existingSlugChecker = { true },
                )
            }
        assertTrue(exception.message!!.contains("Could not generate unique slug"))
    }
}
