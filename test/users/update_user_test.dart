import 'dart:convert';

import 'package:corsac_jwt/corsac_jwt.dart';
import 'package:dart_shelf_realworld_example_app/src/users/dtos/user_dto.dart';
import 'package:http/http.dart';
import 'package:test/test.dart';

import '../helpers/auth_helper.dart';
import '../helpers/users_helper.dart';
import '../test_fixtures.dart';

void main() {
  final uri = Uri.parse(host + '/user');

  test('Given all fields should return 200', () async {
    final userAndPassword = await registerRandomUser();

    final username = faker.internet.userName();
    final email = faker.internet.email();
    final password = faker.internet.password();
    final bio = faker.job.title();
    final image = faker.internet.uri('https');

    final requestData = {
      'user': {
        'email': email,
        'username': username,
        'password': password,
        'bio': bio,
        'image': image
      }
    };

    final response = await put(uri,
        headers: makeAuthorizationHeader(userAndPassword.user.token),
        body: jsonEncode(requestData));

    expect(response.statusCode, 200);

    final responseJson = jsonDecode(response.body);

    final updatedUser = UserDto.fromJson(responseJson);

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

  test('Given username should return 200', () async {
    final userAndPassword = await registerRandomUser();

    final username = faker.internet.userName();

    final requestData = {
      'user': {
        'username': username,
      }
    };

    final response = await put(uri,
        headers: makeAuthorizationHeader(userAndPassword.user.token),
        body: jsonEncode(requestData));

    expect(response.statusCode, 200);

    final responseJson = jsonDecode(response.body);

    final updatedUser = UserDto.fromJson(responseJson);

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

  test('Given email should return 200', () async {
    final userAndPassword = await registerRandomUser();

    final email = faker.internet.email();

    final requestData = {
      'user': {
        'email': email,
      }
    };

    final response = await put(uri,
        headers: makeAuthorizationHeader(userAndPassword.user.token),
        body: jsonEncode(requestData));

    expect(response.statusCode, 200);

    final responseJson = jsonDecode(response.body);

    final updatedUser = UserDto.fromJson(responseJson);

    final fetchedUserAfterUpdate = await getCurrentUser(updatedUser.token);

    final decodedToken = JWT.parse(updatedUser.token);
    final decodedTokenUser = decodedToken.claims['user'];

    expect(updatedUser.username, userAndPassword.user.username);
    expect(updatedUser.email, email);
    expect(decodedTokenUser, {'email': email});
    expect(updatedUser.bio, userAndPassword.user.bio);
    expect(updatedUser.image, userAndPassword.user.image);

    expect(updatedUser.toJson(), fetchedUserAfterUpdate.toJson());
  });

  test('Given bio should return 200', () async {
    final userAndPassword = await registerRandomUser();

    final bio = faker.job.title();

    final requestData = {
      'user': {
        'bio': bio,
      }
    };

    final response = await put(uri,
        headers: makeAuthorizationHeader(userAndPassword.user.token),
        body: jsonEncode(requestData));

    expect(response.statusCode, 200);

    final responseJson = jsonDecode(response.body);

    final updatedUser = UserDto.fromJson(responseJson);

    final fetchedUserAfterUpdate = await getCurrentUser(updatedUser.token);

    final decodedToken = JWT.parse(updatedUser.token);
    final decodedTokenUser = decodedToken.claims['user'];

    expect(updatedUser.username, userAndPassword.user.username);
    expect(updatedUser.email, userAndPassword.user.email);
    expect(decodedTokenUser, {'email': userAndPassword.user.email});
    expect(updatedUser.bio, bio);
    expect(updatedUser.image, userAndPassword.user.image);

    expect(updatedUser.toJson(), fetchedUserAfterUpdate.toJson());
  });

  test('Given image should return 200', () async {
    final userAndPassword = await registerRandomUser();

    final image = faker.internet.uri('https');

    final requestData = {
      'user': {
        'image': image,
      }
    };

    final response = await put(uri,
        headers: makeAuthorizationHeader(userAndPassword.user.token),
        body: jsonEncode(requestData));

    expect(response.statusCode, 200);

    final responseJson = jsonDecode(response.body);

    final updatedUser = UserDto.fromJson(responseJson);

    final fetchedUserAfterUpdate = await getCurrentUser(updatedUser.token);

    final decodedToken = JWT.parse(updatedUser.token);
    final decodedTokenUser = decodedToken.claims['user'];

    expect(updatedUser.username, userAndPassword.user.username);
    expect(updatedUser.email, userAndPassword.user.email);
    expect(decodedTokenUser, {'email': userAndPassword.user.email});
    expect(updatedUser.bio, userAndPassword.user.bio);
    expect(updatedUser.image, image);

    expect(updatedUser.toJson(), fetchedUserAfterUpdate.toJson());
  });

  test('Given no fields should return 200', () async {
    final userAndPassword = await registerRandomUser();

    final requestData = {'user': {}};

    final response = await put(uri,
        headers: makeAuthorizationHeader(userAndPassword.user.token),
        body: jsonEncode(requestData));

    expect(response.statusCode, 200);

    final responseJson = jsonDecode(response.body);

    final updatedUser = UserDto.fromJson(responseJson);

    final fetchedUserAfterUpdate = await getCurrentUser(updatedUser.token);

    expect(userAndPassword.user.toJson(), updatedUser.toJson());
    expect(updatedUser.toJson(), fetchedUserAfterUpdate.toJson());
  });

  group('authorization', () {
    test('Given no authorization header should return 401', () async {
      final response = await get(uri);

      expect(response.statusCode, 401);
    });

    test('Given invalid authorization header should return 401', () async {
      final headers = {'Authorization': 'invalid'};
      final response = await get(uri, headers: headers);

      expect(response.statusCode, 401);
    });

    test('Given no token should return 401', () async {
      final headers = {'Authorization': 'Token '};
      final response = await get(uri, headers: headers);

      expect(response.statusCode, 401);
    });

    test('Given user is not found should return 401', () async {
      final email = faker.internet.email();
      final token = makeToken(email);

      final headers = {'Authorization': 'Token $token'};

      final response = await get(uri, headers: headers);

      expect(response.statusCode, 401);
    });
  });
}
