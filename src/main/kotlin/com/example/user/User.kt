package com.example.user

import com.example.shared.architecture.AggregateRoot
import com.example.shared.domain.Entity
import java.time.OffsetDateTime

@AggregateRoot
data class User(
    override val id: Long? = null,
    val email: String,
    val username: String,
    val passwordHash: String,
    val bio: String? = null,
    val image: String? = null,
    val createdAt: OffsetDateTime = OffsetDateTime.now(),
    val updatedAt: OffsetDateTime = OffsetDateTime.now(),
) : Entity<Long> {
    init {
        require(email.isNotBlank()) { "Email must not be blank" }
        require(EMAIL_REGEX.matches(email)) { "Email must be a valid email address" }
        require(username.isNotBlank()) { "Username must not be blank" }
        require(username.length in MIN_USERNAME_LENGTH..MAX_USERNAME_LENGTH) {
            "Username must be between $MIN_USERNAME_LENGTH and $MAX_USERNAME_LENGTH characters"
        }
    }

    companion object {
        private val EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$".toRegex()
        private const val MIN_USERNAME_LENGTH = 3
        private const val MAX_USERNAME_LENGTH = 50
    }

    override fun withId(newId: Long): User = copy(id = newId)

    fun updateProfile(
        email: String? = null,
        username: String? = null,
        bio: String? = null,
        image: String? = null,
    ): User {
        val updatedEmail = if (email != null && email.isNotBlank()) email else this.email
        val updatedUsername = if (username != null && username.isNotBlank()) username else this.username

        return copy(
            email = updatedEmail,
            username = updatedUsername,
            bio = bio ?: this.bio,
            image = image ?: this.image,
            updatedAt = OffsetDateTime.now(),
        )
    }

    fun updatePassword(newPasswordHash: String): User =
        copy(
            passwordHash = newPasswordHash,
            updatedAt = OffsetDateTime.now(),
        )
}
