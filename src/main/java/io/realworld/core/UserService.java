package io.realworld.core;

import io.realworld.api.request.Login;
import io.realworld.api.request.NewUser;
import io.realworld.api.request.UpdatedUser;
import io.realworld.api.response.User;
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

    public User login(final Login login) {
        final User user = userRepository.findUserByEmail(login.getEmail());
        if (user == null || !passwordEncoder.matches(login.getPassword(), user.getPassword())) {
            throw new ApplicationException(INVALID_CREDENTIALS);
        }
        user.setToken(jwtTokenService.generateJwt(user.getUsername()).getToken());
        return user;
    }


    public User findByUsername(final String username) {
        final User user = findUser(username);
        user.setToken(jwtTokenService.generateJwt(user.getUsername()).getToken());
        return user;
    }

    public User saveUser(final NewUser user) {
        checkIfUsernameIsUnique(user.getUsername());
        checkIfEmailIsUnique(user.getEmail());

        final long id = userRepository.save(user.getUsername(),
                user.getEmail(),
                passwordEncoder.encode(user.getPassword()));

        final User createdUser = userRepository.findUserById(id);
        createdUser.setToken(jwtTokenService.generateJwt(user.getUsername()).getToken());
        return createdUser;
    }

    public User updateUser(final String username, final UpdatedUser updatedUser) {
        final User existingUser = findUser(username);

        if (updatedUser.getUsername() != null && !Objects.equals(existingUser.getUsername(), updatedUser.getUsername())) {
            checkIfUsernameIsUnique(updatedUser.getUsername());
        }
        if (updatedUser.getEmail() != null && !Objects.equals(existingUser.getEmail(), updatedUser.getEmail())) {
            checkIfEmailIsUnique(updatedUser.getEmail());
        }

        userRepository.updateUser(
                existingUser.getId(),
                coalesce(updatedUser.getUsername(), existingUser.getUsername()),
                coalesce(updatedUser.getEmail(), existingUser.getEmail()),
                //should password be updated without asking for the old password first???
                coalesce(encode(updatedUser.getPassword()), existingUser.getPassword()),
                coalesce(updatedUser.getImage(), existingUser.getImage()),
                coalesce(updatedUser.getBio(), existingUser.getBio())
        );


        return userRepository.findUserById(existingUser.getId());
    }

    private User findUser(final String username) {
        final User user = userRepository.findUserByUsername(username);
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
}