package io.realworld.core;

import io.realworld.api.request.LoginDto;
import io.realworld.api.request.NewUserDto;
import io.realworld.api.request.UpdatedUserDto;
import io.realworld.api.response.UserDto;
import io.realworld.core.model.User;
import io.realworld.db.UserRepository;
import io.realworld.exceptions.ApplicationException;
import io.realworld.exceptions.ErrorCode;
import io.realworld.security.JwtTokenService;
import io.realworld.security.PasswordEncoder;

import java.util.Objects;

import static io.realworld.exceptions.ErrorCode.INVALID_CREDENTIALS;
import static io.realworld.exceptions.ErrorCode.NOT_FOUND;

public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenService jwtTokenService;

    public UserService(final UserRepository userRepository,
                       final PasswordEncoder passwordEncoder,
                       final JwtTokenService jwtTokenService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenService = jwtTokenService;
    }

    public UserDto login(final LoginDto login) {
        final var user = userRepository.findUserByEmail(login.email());
        if (user == null || !passwordEncoder.matches(login.password(), user.password())) {
            throw new ApplicationException(INVALID_CREDENTIALS);
        }
        return toDto(user);
    }

    public UserDto findByUsername(final String username) {
        final var user = findUser(username);
        return toDto(user);
    }

    public UserDto saveUser(final NewUserDto user) {
        checkIfUsernameIsUnique(user.username());
        checkIfEmailIsUnique(user.email());

        final long id = userRepository.save(user.username(), user.email(), passwordEncoder.encode(user.password()));

        final var createdUser = userRepository.findUserById(id);

        return toDto(createdUser);
    }

    public UserDto updateUser(final String username, final UpdatedUserDto updatedUser) {
        final var existingUser = findUser(username);

        if (updatedUser.username() != null && !Objects.equals(existingUser.username(), updatedUser.username())) {
            checkIfUsernameIsUnique(updatedUser.username());
        }
        if (updatedUser.email() != null && !Objects.equals(existingUser.email(), updatedUser.email())) {
            checkIfEmailIsUnique(updatedUser.email());
        }

        userRepository.updateUser(
                existingUser.id(),
                coalesce(updatedUser.username(), existingUser.username()),
                coalesce(updatedUser.email(), existingUser.email()),
                //should password be updated without asking for the old password first???
                coalesce(encode(updatedUser.password()), existingUser.password()),
                coalesce(updatedUser.image(), existingUser.image()),
                coalesce(updatedUser.bio(), existingUser.bio())
        );


        var user = userRepository.findUserById(existingUser.id());
        return toDto(user);
    }

    private User findUser(final String username) {
        final var user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new ApplicationException(NOT_FOUND, "User [" + username + "] not found");
        }
        return user;
    }

    private void checkIfEmailIsUnique(final String email) {
        final Long userId = userRepository.findUserIdByEmail(email);
        if (userId != null) {
            throw new ApplicationException(ErrorCode.DUPLICATE_EMAIL, "Email [" + email + "] is already used");
        }
    }

    private void checkIfUsernameIsUnique(final String username) {
        final Long userId = userRepository.findUserIdByUsername(username);
        if (userId != null) {
            throw new ApplicationException(ErrorCode.DUPLICATE_USERNAME, "Username [" + username + "] is already used");
        }
    }

    private String coalesce(final String value, final String defaultValue) {
        return value != null ? value : defaultValue;
    }

    private String encode(final String password) {
        return password != null ? passwordEncoder.encode(password) : null;
    }

    private UserDto toDto(User user) {
        return new UserDto(user.email(),
                user.username(),
                user.bio(),
                user.image(),
                jwtTokenService.generateJwt(user.username()).token());
    }

}