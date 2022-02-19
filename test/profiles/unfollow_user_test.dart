import 'dart:convert';

import 'package:dart_shelf_realworld_example_app/src/common/errors/dtos/error_dto.dart';
import 'package:dart_shelf_realworld_example_app/src/users/dtos/user_dto.dart';
import 'package:http/http.dart';
import 'package:test/test.dart';

import '../helpers/auth_helper.dart';
import '../helpers/profiles_helper.dart';
import '../helpers/users_helper.dart';
import '../test_fixtures.dart';

void main() {
  late UserDto followee;

  setUp(() async {
    followee = (await registerRandomUserAndUpdateBioAndImage()).user;
  });

  test('Given caller already follows should return 200', () async {
    final caller = await registerRandomUser();

    await followUser(
        followeeUsername: followee.username, followerToken: caller.user.token);

    final profile = await unfollowUserAndDecode(
        followeeUsername: followee.username, followerToken: caller.user.token);

    final fetchedProfileAfterUpdate =
        await getProfileAndDecode(username: followee.username);

    expect(fetchedProfileAfterUpdate.following, false);

    expect(fetchedProfileAfterUpdate.username, followee.username);
    expect(fetchedProfileAfterUpdate.bio, followee.bio);
    expect(fetchedProfileAfterUpdate.image, followee.image);

    expect(profile.toJson(), fetchedProfileAfterUpdate.toJson());
  });

  test('Given caller does not follow should return 200', () async {
    final caller = await registerRandomUser();

    final profile = await unfollowUserAndDecode(
        followeeUsername: followee.username, followerToken: caller.user.token);

    final fetchedProfileAfterUpdate =
        await getProfileAndDecode(username: followee.username);

    expect(fetchedProfileAfterUpdate.following, false);

    expect(fetchedProfileAfterUpdate.username, followee.username);
    expect(fetchedProfileAfterUpdate.bio, followee.bio);
    expect(fetchedProfileAfterUpdate.image, followee.image);

    expect(profile.toJson(), fetchedProfileAfterUpdate.toJson());
  });

  test('Given followee is not found should return 404', () async {
    final caller = await registerRandomUser();

    final username = faker.internet.userName();

    final response = await unfollowUser(
        followeeUsername: username, followerToken: caller.user.token);

    expect(response.statusCode, 404);

    final responseJson = jsonDecode(response.body);

    final errorDto = ErrorDto.fromJson(responseJson);

    expect(errorDto.errors[0], 'User not found');
  });

  group('authorization', () {
    test('Given no authorization header should return 401', () async {
      final response = await delete(unfollowUserUri(followee.username));

      expect(response.statusCode, 401);
    });

    test('Given invalid authorization header should return 401', () async {
      final headers = {'Authorization': 'invalid'};
      final response =
          await delete(unfollowUserUri(followee.username), headers: headers);

      expect(response.statusCode, 401);
    });

    test('Given no token should return 401', () async {
      final headers = {'Authorization': 'Token '};
      final response =
          await delete(unfollowUserUri(followee.username), headers: headers);

      expect(response.statusCode, 401);
    });

    test('Given user is not found should return 401', () async {
      final email = faker.internet.email();
      final token = makeToken(email);

      final headers = {'Authorization': 'Token $token'};

      final response =
          await delete(unfollowUserUri(followee.username), headers: headers);

      expect(response.statusCode, 401);
    });
  });
}
