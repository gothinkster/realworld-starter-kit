package com.example.profile

import com.example.shared.exceptions.BadRequestException
import com.example.shared.exceptions.NotFoundException
import com.example.shared.security.SecurityContext
import com.example.user.UserRepository
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import jakarta.transaction.Transactional

@ApplicationScoped
class ProfileService {
    @Inject
    lateinit var userRepository: UserRepository

    @Inject
    lateinit var followRepository: FollowRepository

    @Inject
    lateinit var securityContext: SecurityContext

    @Transactional
    fun followUser(username: String) {
        val followerId = securityContext.requireCurrentUserId()
        val followee =
            userRepository.findByUsername(username)
                ?: throw NotFoundException("User not found")

        if (followee.id == followerId) {
            throw BadRequestException("Cannot follow yourself")
        }

        followRepository.follow(followerId, followee.id!!)
    }

    @Transactional
    fun unfollowUser(username: String) {
        val followerId = securityContext.requireCurrentUserId()
        val followee =
            userRepository.findByUsername(username)
                ?: throw NotFoundException("User not found")

        followRepository.unfollow(followerId, followee.id!!)
    }
}
