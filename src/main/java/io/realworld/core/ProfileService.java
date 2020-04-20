package io.realworld.core;

import io.realworld.api.response.Profile;
import io.realworld.db.UserRepository;
import io.realworld.exceptions.ApplicationException;
import io.realworld.exceptions.ErrorCode;

import static io.realworld.exceptions.ErrorCode.NOT_FOUND;

public class ProfileService {

    private final UserRepository userRepository;

    public ProfileService(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Profile findProfileByUsername(final String username, final String followedBy) {
        final Profile profile = userRepository.findProfileByUsername(username);
        if (profile == null) {
            throw new ApplicationException(NOT_FOUND, "User [" + username + "] does not exists");
        }
        profile.setFollowing(userRepository.isFollowing(profile.getId(), followedBy));
        return profile;
    }

    public Profile followProfile(final String username, final String authenticatedUsername) {
        final Profile profileToFollow = userRepository.findProfileByUsername(username);
        final Long authenticatedUserId = findUserId(authenticatedUsername);
        if (userRepository.isFollowing(profileToFollow.getId(), authenticatedUserId)) {
            throw new ApplicationException(ErrorCode.USER_ALREADY_FOLLOWED, "User [" + username + "] is already followed");
        }
        userRepository.followProfile(profileToFollow.getId(), authenticatedUserId);
        profileToFollow.setFollowing(true);
        return profileToFollow;
    }

    public Profile unfollowProfile(final String username, final String authenticatedUsername) {
        final Profile profileToUnfollow = userRepository.findProfileByUsername(username);
        final Long authenticatedUserId = findUserId(authenticatedUsername);
        userRepository.unfollowProfile(profileToUnfollow.getId(), authenticatedUserId);
        profileToUnfollow.setFollowing(false);
        return profileToUnfollow;
    }

    private Long findUserId(final String username) {
        final Long followedUserId = userRepository.findUserIdByUsername(username);
        if (followedUserId == null) {
            throw new ApplicationException(NOT_FOUND, "User [" + username + "] does not exists");
        }
        return followedUserId;
    }
}
