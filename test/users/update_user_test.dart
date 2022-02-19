import 'dart:convert';

import 'package:corsac_jwt/corsac_jwt.dart';
import 'package:dart_shelf_realworld_example_app/src/common/errors/dtos/error_dto.dart';
import 'package:http/http.dart';
import 'package:test/test.dart';

import '../helpers/auth_helper.dart';
import '../helpers/users_helper.dart';
import '../test_fixtures.dart';

void main() {
  test('Given all fields should return 200', () async {
    final userAndPassword = await registerRandomUser();

    final username = faker.internet.userName();
    final email = faker.internet.email();
    final password = faker.internet.password();
    final bio = faker.job.title();
    final image = faker.internet.uri('https');

    final updatedUser = await updateUserAndDecode(
        token: userAndPassword.user.token,
        username: username,
        email: email,
        password: password,
        bio: bio,
        image: image);

    final fetchedUserAfterUpdate = await getCurrentUser(updatedUser.token);

    final decodedToken = JWT.parse(updatedUser.token);
    final decodedTokenUser = decodedToken.claims['user'];

    expect(updatedUser.username, username);
    expect(updatedUser.email, email);
    expect(decodedTokenUser, {'email': updatedUser.email});
    expect(updatedUser.bio, bio);
    expect(updatedUser.image, image);

    expect(updatedUser.toJson(), fetchedUserAfterUpdate.toJson());
  });

  group('Given username', () {
    test('Should return 200', () async {
      final userAndPassword = await registerRandomUser();

      final username = faker.internet.userName();

      final updatedUser = await updateUserAndDecode(
          token: userAndPassword.user.token, username: username);

      final fetchedUserAfterUpdate = await getCurrentUser(updatedUser.token);

      final decodedToken = JWT.parse(updatedUser.token);
      final decodedTokenUser = decodedToken.claims['user'];

      expect(updatedUser.username, username);

      expect(updatedUser.email, userAndPassword.user.email);
      expect(decodedTokenUser, {'email': userAndPassword.user.email});
      expect(updatedUser.bio, userAndPassword.user.bio);
      expect(updatedUser.image, userAndPassword.user.image);

      expect(updatedUser.toJson(), fetchedUserAfterUpdate.toJson());
    });

    test('Given empty username should return 422', () async {
      final userAndPassword = await registerRandomUser();

      final username = '';

      final response = await updateUser(
          token: userAndPassword.user.token, username: username);

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'username cannot be blank');
    });

    test('Given whitespace username should return 422', () async {
      final userAndPassword = await registerRandomUser();

      final username = ' ';

      final response = await updateUser(
          token: userAndPassword.user.token, username: username);

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'username cannot be blank');
    });

    test('Given username already exists should return 409', () async {
      final userAndPassword = await registerRandomUser();

      final anotherUserAndPassword = await registerRandomUser();

      final response = await updateUser(
          token: userAndPassword.user.token,
          username: anotherUserAndPassword.user.username);

      expect(response.statusCode, 409);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'Username is taken');
    });
  });

  group('Given email', () {
    test('should return 200', () async {
      final userAndPassword = await registerRandomUser();

      final email = faker.internet.email();

      final updatedUser = await updateUserAndDecode(
          token: userAndPassword.user.token, email: email);

      final fetchedUserAfterUpdate = await getCurrentUser(updatedUser.token);

      final decodedToken = JWT.parse(updatedUser.token);
      final decodedTokenUser = decodedToken.claims['user'];

      expect(updatedUser.email, email);

      expect(updatedUser.username, userAndPassword.user.username);
      expect(decodedTokenUser, {'email': email});
      expect(updatedUser.bio, userAndPassword.user.bio);
      expect(updatedUser.image, userAndPassword.user.image);

      expect(updatedUser.toJson(), fetchedUserAfterUpdate.toJson());
    });

    test('Given empty email should return 422', () async {
      final userAndPassword = await registerRandomUser();

      final email = '';

      final response =
          await updateUser(token: userAndPassword.user.token, email: email);

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'Invalid email: $email');
    });

    test('Given whitespace email should return 422', () async {
      final userAndPassword = await registerRandomUser();

      final email = ' ';

      final response =
          await updateUser(token: userAndPassword.user.token, email: email);

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'Invalid email: $email');
    });

    test('Given invalid email should return 422', () async {
      final userAndPassword = await registerRandomUser();

      final email = faker.lorem.word();

      final response =
          await updateUser(token: userAndPassword.user.token, email: email);

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'Invalid email: $email');
    });

    test('Given email already exists should return 409', () async {
      final userAndPassword = await registerRandomUser();

      final anotherUserAndPassword = await registerRandomUser();

      final response = await updateUser(
          token: userAndPassword.user.token,
          email: anotherUserAndPassword.user.email);

      expect(response.statusCode, 409);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'Email is taken');
    });
  });

  group('Given bio', () {
    test('Should return 200', () async {
      final userAndPassword = await registerRandomUser();

      final bio = faker.job.title();

      final updatedUser = await updateUserAndDecode(
          token: userAndPassword.user.token, bio: bio);

      final fetchedUserAfterUpdate = await getCurrentUser(updatedUser.token);

      final decodedToken = JWT.parse(updatedUser.token);
      final decodedTokenUser = decodedToken.claims['user'];

      expect(updatedUser.bio, bio);

      expect(updatedUser.username, userAndPassword.user.username);
      expect(updatedUser.email, userAndPassword.user.email);
      expect(decodedTokenUser, {'email': userAndPassword.user.email});
      expect(updatedUser.image, userAndPassword.user.image);

      expect(updatedUser.toJson(), fetchedUserAfterUpdate.toJson());
    });
  });

  group('Given image', () {
    test('Should return 200', () async {
      final userAndPassword = await registerRandomUser();

      final image = faker.internet.uri('https');

      final updatedUser = await updateUserAndDecode(
          token: userAndPassword.user.token, image: image);

      final fetchedUserAfterUpdate = await getCurrentUser(updatedUser.token);

      final decodedToken = JWT.parse(updatedUser.token);
      final decodedTokenUser = decodedToken.claims['user'];

      expect(updatedUser.image, image);

      expect(updatedUser.username, userAndPassword.user.username);
      expect(updatedUser.email, userAndPassword.user.email);
      expect(decodedTokenUser, {'email': userAndPassword.user.email});
      expect(updatedUser.bio, userAndPassword.user.bio);

      expect(updatedUser.toJson(), fetchedUserAfterUpdate.toJson());
    });

    test('Given empty image should return 422', () async {
      final userAndPassword = await registerRandomUser();

      final image = '';

      final response =
          await updateUser(token: userAndPassword.user.token, image: image);

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'image must be a HTTP/HTTPS URL');
    });

    test('Given whitespace image should return 422', () async {
      final userAndPassword = await registerRandomUser();

      final image = ' ';

      final response =
          await updateUser(token: userAndPassword.user.token, image: image);

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'image must be a HTTP/HTTPS URL');
    });

    test('Given invalid image URI should return 422', () async {
      final userAndPassword = await registerRandomUser();

      final image = faker.lorem.word();

      final response =
          await updateUser(token: userAndPassword.user.token, image: image);

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'image must be a HTTP/HTTPS URL');
    });
  });

  test('Given no fields should return 200', () async {
    final userAndPassword = await registerRandomUser();

    final updatedUser =
        await updateUserAndDecode(token: userAndPassword.user.token);

    final fetchedUserAfterUpdate = await getCurrentUser(updatedUser.token);

    expect(userAndPassword.user.toJson(), updatedUser.toJson());
    expect(updatedUser.toJson(), fetchedUserAfterUpdate.toJson());
  });

  group('authorization', () {
    test('Given no authorization header should return 401', () async {
      final response = await get(updateUserUri());

      expect(response.statusCode, 401);
    });

    test('Given invalid authorization header should return 401', () async {
      final headers = {'Authorization': 'invalid'};
      final response = await get(updateUserUri(), headers: headers);

      expect(response.statusCode, 401);
    });

    test('Given no token should return 401', () async {
      final headers = {'Authorization': 'Token '};
      final response = await get(updateUserUri(), headers: headers);

      expect(response.statusCode, 401);
    });

    test('Given user is not found should return 401', () async {
      final email = faker.internet.email();
      final token = makeToken(email);

      final headers = {'Authorization': 'Token $token'};

      final response = await get(updateUserUri(), headers: headers);

      expect(response.statusCode, 401);
    });
  });
}
