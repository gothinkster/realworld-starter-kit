import 'dart:convert';

import 'package:dart_shelf_realworld_example_app/src/common/errors/dtos/error_dto.dart';
import 'package:dart_shelf_realworld_example_app/src/users/dtos/user_dto.dart';
import 'package:test/test.dart';

import '../helpers/profiles_helper.dart';
import '../helpers/users_helper.dart';
import '../test_fixtures.dart';

void main() {
  late UserDto profileUser;

  setUp(() async {
    profileUser = (await registerRandomUserAndUpdateBioAndImage()).user;
  });

  group('Caller not authenticated', () {
    test('Should return 200', () async {
      final profile = await getProfileAndDecode(username: profileUser.username);

      expect(profile.username, profileUser.username);
      expect(profile.bio, profileUser.bio);
      expect(profile.image, profileUser.image);
      expect(profile.following, false);
    });

    test('Given profile does not exist should return 404', () async {
      final username = faker.internet.userName();

      final response = await getProfile(username: username);

      expect(response.statusCode, 404);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'User not found');
    });
  });

  group('Caller authenticated', () {
    test('Given caller is following the profile should return 200', () async {
      final caller = await registerRandomUser();

      await followUser(
          followeeUsername: profileUser.username,
          followerToken: caller.user.token);

      final profile = await getProfileAndDecode(
          username: profileUser.username, token: caller.user.token);

      expect(profile.username, profileUser.username);
      expect(profile.bio, profileUser.bio);
      expect(profile.image, profileUser.image);
      expect(profile.following, true);
    });

    test('Given caller is not following the profile should return 200',
        () async {
      final caller = await registerRandomUser();

      final profile = await getProfileAndDecode(
          username: profileUser.username, token: caller.user.token);

      expect(profile.username, profileUser.username);
      expect(profile.bio, profileUser.bio);
      expect(profile.image, profileUser.image);
      expect(profile.following, false);
    });

    test('Given profile does not exist should return 404', () async {
      final caller = await registerRandomUser();

      final username = faker.internet.userName();

      final response =
          await getProfile(username: username, token: caller.user.token);

      expect(response.statusCode, 404);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'User not found');
    });
  });
}
