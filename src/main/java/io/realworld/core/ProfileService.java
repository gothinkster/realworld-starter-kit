package io.realworld.core;

import io.realworld.api.response.ProfileDto;
import io.realworld.core.model.Profile;
import io.realworld.db.UserRepository;
import io.realworld.exceptions.ApplicationException;
import io.realworld.exceptions.ErrorCode;

import static io.realworld.exceptions.ErrorCode.NOT_FOUND;

public class ProfileService {

    private final UserRepository userRepository;

    public ProfileService(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ProfileDto findProfileByUsername(final String username, final String followedBy) {
        final var profile = findProfile(username);
        final var following = userRepository.isFollowing(profile.id(), followedBy);
        return toDto(profile, following);
    }

    public ProfileDto followProfile(final String username, final String authenticatedUsername) {
        final var profileToFollow = findProfile(username);
        final Long authenticatedUserId = findUserId(authenticatedUsername);
        if (userRepository.isFollowing(profileToFollow.id(), authenticatedUserId)) {
            throw new ApplicationException(ErrorCode.USER_ALREADY_FOLLOWED, "User [" + username + "] is already followed");
        }
        userRepository.followProfile(profileToFollow.id(), authenticatedUserId);
        return toDto(profileToFollow, true);
    }

    public ProfileDto unfollowProfile(final String username, final String authenticatedUsername) {
        final var profileToUnfollow = findProfile(username);
        final Long authenticatedUserId = findUserId(authenticatedUsername);
        userRepository.unfollowProfile(profileToUnfollow.id(), authenticatedUserId);
        return toDto(profileToUnfollow, false);
    }

    private Long findUserId(final String username) {
        final Long followedUserId = userRepository.findUserIdByUsername(username);
        if (followedUserId == null) {
            throw new ApplicationException(NOT_FOUND, "User [" + username + "] does not exists");
        }
        return followedUserId;
    }

    private Profile findProfile(String username) {
        final var profile = userRepository.findProfileByUsername(username);
        if (profile == null) {
            throw new ApplicationException(NOT_FOUND, "User [" + username + "] does not exists");
        }
        return profile;
    }

    private ProfileDto toDto(Profile profile, Boolean following) {
        return new ProfileDto(profile.username(),
                profile.bio(),
                profile.image(),
                following);
    }
}
