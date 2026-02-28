package com.example.shared.utils

import jakarta.enterprise.context.ApplicationScoped

@ApplicationScoped
class SlugGenerator {
    companion object {
        private const val MAX_SLUG_ATTEMPTS = 100
    }

    fun generateUniqueSlug(
        title: String,
        existingSlugChecker: (String) -> Boolean,
    ): String {
        val baseSlug = generateBaseSlug(title)
        var candidateSlug = baseSlug
        var counter = 2

        repeat(MAX_SLUG_ATTEMPTS) {
            if (!existingSlugChecker(candidateSlug)) {
                return candidateSlug
            }
            candidateSlug = "$baseSlug-$counter"
            counter++
        }

        throw IllegalStateException("Could not generate unique slug after $MAX_SLUG_ATTEMPTS attempts")
    }

    private fun generateBaseSlug(title: String): String {
        val normalized = java.text.Normalizer.normalize(title, java.text.Normalizer.Form.NFD)
        return normalized
            .replace("\\p{InCombiningDiacriticalMarks}+".toRegex(), "")
            .lowercase()
            .replace("[^a-z0-9\\s-]".toRegex(), "")
            .trim()
            .replace("\\s+".toRegex(), "-")
            .replace("-+".toRegex(), "-")
    }
}
