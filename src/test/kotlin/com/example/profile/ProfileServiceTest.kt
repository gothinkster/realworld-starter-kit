package com.example.profile

import com.example.shared.exceptions.BadRequestException
import com.example.shared.exceptions.NotFoundException
import com.example.shared.security.SecurityContext
import com.example.user.User
import com.example.user.UserRepository
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import kotlin.test.assertEquals

class ProfileServiceTest {
    private lateinit var profileService: ProfileService
    private lateinit var userRepository: UserRepository
    private lateinit var followRepository: FollowRepository
    private lateinit var securityContext: SecurityContext

    @BeforeEach
    fun setup() {
        userRepository = mockk()
        followRepository = mockk()
        securityContext = mockk()
        profileService = ProfileService()
        profileService.userRepository = userRepository
        profileService.followRepository = followRepository
        profileService.securityContext = securityContext
    }

    @Test
    fun `followUser should follow when user exists`() {
        val followerId = 1L
        val username = "targetuser"

        val followee =
            User(
                id = 2L,
                email = "target@example.com",
                username = username,
                passwordHash = "hash",
            )

        every { securityContext.requireCurrentUserId() } returns followerId
        every { userRepository.findByUsername(username) } returns followee
        every { followRepository.follow(followerId, 2L) } returns Unit

        profileService.followUser(username)

        verify { securityContext.requireCurrentUserId() }
        verify { userRepository.findByUsername(username) }
        verify { followRepository.follow(followerId, 2L) }
    }

    @Test
    fun `followUser should throw NotFoundException when user not found`() {
        val followerId = 1L
        val username = "nonexistent"

        every { securityContext.requireCurrentUserId() } returns followerId
        every { userRepository.findByUsername(username) } returns null

        val exception =
            assertThrows<NotFoundException> {
                profileService.followUser(username)
            }

        assertEquals("User not found", exception.message)
        verify { securityContext.requireCurrentUserId() }
        verify { userRepository.findByUsername(username) }
        verify(exactly = 0) { followRepository.follow(any(), any()) }
    }

    @Test
    fun `followUser should throw BadRequestException when trying to follow self`() {
        val followerId = 1L
        val username = "selfuser"

        val followee =
            User(
                id = followerId,
                email = "self@example.com",
                username = username,
                passwordHash = "hash",
            )

        every { securityContext.requireCurrentUserId() } returns followerId
        every { userRepository.findByUsername(username) } returns followee

        val exception =
            assertThrows<BadRequestException> {
                profileService.followUser(username)
            }

        assertEquals("Cannot follow yourself", exception.message)
        verify { securityContext.requireCurrentUserId() }
        verify { userRepository.findByUsername(username) }
        verify(exactly = 0) { followRepository.follow(any(), any()) }
    }

    @Test
    fun `unfollowUser should unfollow when user exists`() {
        val followerId = 1L
        val username = "targetuser"

        val followee =
            User(
                id = 2L,
                email = "target@example.com",
                username = username,
                passwordHash = "hash",
            )

        every { securityContext.requireCurrentUserId() } returns followerId
        every { userRepository.findByUsername(username) } returns followee
        every { followRepository.unfollow(followerId, 2L) } returns Unit

        profileService.unfollowUser(username)

        verify { securityContext.requireCurrentUserId() }
        verify { userRepository.findByUsername(username) }
        verify { followRepository.unfollow(followerId, 2L) }
    }

    @Test
    fun `unfollowUser should throw NotFoundException when user not found`() {
        val followerId = 1L
        val username = "nonexistent"

        every { securityContext.requireCurrentUserId() } returns followerId
        every { userRepository.findByUsername(username) } returns null

        val exception =
            assertThrows<NotFoundException> {
                profileService.unfollowUser(username)
            }

        assertEquals("User not found", exception.message)
        verify { securityContext.requireCurrentUserId() }
        verify { userRepository.findByUsername(username) }
        verify(exactly = 0) { followRepository.unfollow(any(), any()) }
    }
}
