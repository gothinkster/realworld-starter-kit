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
  late UserDto profileUser;

  setUp(() async {
    profileUser = (await registerRandomUserAndUpdateBioAndImage()).user;
  });

  group('Caller not authenticated', () {
    test('Should return 200 and following false', () async {
      final profile = await getProfile(username: profileUser.username);

      expect(profile.username, profileUser.username);
      expect(profile.bio, profileUser.bio);
      expect(profile.image, profileUser.image);
      expect(profile.following, false);
    });

    test('Given profile does not exist should return 404', () async {
      final uri =
          Uri.parse(host + '/profiles/${faker.internet.userName()}/follow');

      final response = await get(uri);

      expect(response.statusCode, 404);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'User not found');
    });
  });

  group('Caller authenticated', () {
    test('Given caller is following Should return 200', () async {
      final caller = await registerRandomUser();

      await followUser(
          followeeUsername: profileUser.username,
          followerToken: caller.user.token);

      final profile = await getProfile(
          username: profileUser.username, token: caller.user.token);

      expect(profile.username, profileUser.username);
      expect(profile.bio, profileUser.bio);
      expect(profile.image, profileUser.image);
      expect(profile.following, true);
    });

    test('Given caller is not following Should return 200', () async {
      final caller = await registerRandomUser();

      final profile = await getProfile(
          username: profileUser.username, token: caller.user.token);

      expect(profile.username, profileUser.username);
      expect(profile.bio, profileUser.bio);
      expect(profile.image, profileUser.image);
      expect(profile.following, false);
    });

    test('Given profile does not exist should return 404', () async {
      final caller = await registerRandomUser();

      final uri =
          Uri.parse(host + '/profiles/${faker.internet.userName()}/follow');

      final headers = makeAuthorizationHeader(caller.user.token);

      final response = await get(uri, headers: headers);

      expect(response.statusCode, 404);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'User not found');
    });
  });
}
