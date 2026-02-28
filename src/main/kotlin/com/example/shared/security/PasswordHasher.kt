package com.example.shared.security

import de.mkammerer.argon2.Argon2
import de.mkammerer.argon2.Argon2Factory
import jakarta.enterprise.context.ApplicationScoped

@ApplicationScoped
class PasswordHasher {
    companion object {
        private const val SALT_LENGTH = 32
        private const val HASH_LENGTH = 64
        private const val ITERATIONS = 10
        private const val MEMORY_KB = 65536
        private const val PARALLELISM = 1
    }

    private val argon2: Argon2 =
        Argon2Factory.create(
            Argon2Factory.Argon2Types.ARGON2id,
            SALT_LENGTH,
            HASH_LENGTH,
        )

    fun hash(password: String): String {
        val chars = password.toCharArray()
        return try {
            argon2.hash(ITERATIONS, MEMORY_KB, PARALLELISM, chars)
        } finally {
            argon2.wipeArray(chars)
        }
    }

    fun verify(
        hash: String,
        password: String,
    ): Boolean {
        val chars = password.toCharArray()
        return try {
            argon2.verify(hash, chars)
        } finally {
            argon2.wipeArray(chars)
        }
    }
}
