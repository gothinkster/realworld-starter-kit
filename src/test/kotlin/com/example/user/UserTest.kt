package com.example.user

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import java.time.OffsetDateTime
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue

class UserTest {
    @Test
    fun `should create valid user`() {
        val user =
            User(
                email = "test@example.com",
                username = "testuser",
                passwordHash = "hashed-password",
                bio = "Test bio",
                image = "https://example.com/image.jpg",
            )

        assertEquals("test@example.com", user.email)
        assertEquals("testuser", user.username)
        assertEquals("hashed-password", user.passwordHash)
        assertEquals("Test bio", user.bio)
        assertEquals("https://example.com/image.jpg", user.image)
    }

    @Test
    fun `should fail when email is blank`() {
        val exception =
            assertThrows<IllegalArgumentException> {
                User(
                    email = "",
                    username = "testuser",
                    passwordHash = "hashed-password",
                )
            }

        assertEquals("Email must not be blank", exception.message)
    }

    @Test
    fun `should fail when email is invalid`() {
        val exception =
            assertThrows<IllegalArgumentException> {
                User(
                    email = "invalid-email",
                    username = "testuser",
                    passwordHash = "hashed-password",
                )
            }

        assertEquals("Email must be a valid email address", exception.message)
    }

    @Test
    fun `should fail when username is blank`() {
        val exception =
            assertThrows<IllegalArgumentException> {
                User(
                    email = "test@example.com",
                    username = "",
                    passwordHash = "hashed-password",
                )
            }

        assertEquals("Username must not be blank", exception.message)
    }

    @Test
    fun `should fail when username is too short`() {
        val exception =
            assertThrows<IllegalArgumentException> {
                User(
                    email = "test@example.com",
                    username = "ab",
                    passwordHash = "hashed-password",
                )
            }

        assertEquals("Username must be between 3 and 50 characters", exception.message)
    }

    @Test
    fun `should fail when username is too long`() {
        val exception =
            assertThrows<IllegalArgumentException> {
                User(
                    email = "test@example.com",
                    username = "a".repeat(51),
                    passwordHash = "hashed-password",
                )
            }

        assertEquals("Username must be between 3 and 50 characters", exception.message)
    }

    @Test
    fun `should update profile with all fields`() {
        val originalUser =
            User(
                email = "original@example.com",
                username = "original",
                passwordHash = "hashed-password",
                bio = "Original bio",
                image = "https://example.com/original.jpg",
                updatedAt = OffsetDateTime.now().minusDays(1),
            )

        val updatedUser =
            originalUser.updateProfile(
                email = "updated@example.com",
                username = "updated",
                bio = "Updated bio",
                image = "https://example.com/updated.jpg",
            )

        assertEquals("updated@example.com", updatedUser.email)
        assertEquals("updated", updatedUser.username)
        assertEquals("Updated bio", updatedUser.bio)
        assertEquals("https://example.com/updated.jpg", updatedUser.image)
        assertTrue(updatedUser.updatedAt.isAfter(originalUser.updatedAt))
    }

    @Test
    fun `should keep existing email and username when not provided`() {
        val originalUser =
            User(
                email = "original@example.com",
                username = "original",
                passwordHash = "hashed-password",
            )

        val updatedUser =
            originalUser.updateProfile(
                bio = "New bio",
                image = "https://example.com/new.jpg",
            )

        assertEquals("original@example.com", updatedUser.email)
        assertEquals("original", updatedUser.username)
        assertEquals("New bio", updatedUser.bio)
        assertEquals("https://example.com/new.jpg", updatedUser.image)
    }

    @Test
    fun `should keep existing bio and image when null provided`() {
        val originalUser =
            User(
                email = "test@example.com",
                username = "testuser",
                passwordHash = "hashed-password",
                bio = "Original bio",
                image = "https://example.com/original.jpg",
            )

        val updatedUser =
            originalUser.updateProfile(
                bio = null,
                image = null,
            )

        assertEquals("Original bio", updatedUser.bio)
        assertEquals("https://example.com/original.jpg", updatedUser.image)
    }

    @Test
    fun `should update password and timestamp`() {
        val originalUser =
            User(
                email = "test@example.com",
                username = "testuser",
                passwordHash = "old-hash",
                updatedAt = OffsetDateTime.now().minusDays(1),
            )

        val updatedUser = originalUser.updatePassword("new-hash")

        assertEquals("new-hash", updatedUser.passwordHash)
        assertTrue(updatedUser.updatedAt.isAfter(originalUser.updatedAt))
    }

    @Test
    fun `should assign new id with withId`() {
        val user =
            User(
                id = 1L,
                email = "test@example.com",
                username = "testuser",
                passwordHash = "hashed-password",
            )

        val userWithNewId = user.withId(2L)

        assertEquals(2L, userWithNewId.id)
        assertEquals("test@example.com", userWithNewId.email)
    }
}
