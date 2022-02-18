import 'dart:convert';

import 'package:dart_shelf_realworld_example_app/src/profiles/dtos/profile_dto.dart';
import 'package:http/http.dart';
import 'package:test/test.dart';

import '../test_fixtures.dart';
import 'auth_helper.dart';

Future<ProfileDto> getProfile({required String username, String? token}) async {
  final uri = Uri.parse(host + '/profiles/$username');

  var headers = <String, String>{};

  if (token != null) {
    headers = makeAuthorizationHeader(token);
  }

  final response = await get(uri, headers: headers);

  expect(response.statusCode, 200);

  final responseJson = jsonDecode(response.body);

  return ProfileDto.fromJson(responseJson);
}

Future<ProfileDto> followUser(
    {required String followeeUsername, required String followerToken}) async {
  final uri = Uri.parse(host + '/profiles/$followeeUsername/follow');

  var headers = makeAuthorizationHeader(followerToken);

  final response = await post(uri, headers: headers);

  expect(response.statusCode, 200);

  final responseJson = jsonDecode(response.body);

  return ProfileDto.fromJson(responseJson);
}
