import 'dart:convert';

import 'package:dart_shelf_realworld_example_app/src/profiles/dtos/profile_dto.dart';
import 'package:http/http.dart';
import 'package:test/test.dart';

import '../test_fixtures.dart';
import 'auth_helper.dart';

Uri getProfileUri(String username) {
  return Uri.parse(host + '/profiles/$username');
}

Future<Response> getProfile({required String username, String? token}) async {
  Map<String, String> headers = {};

  if (token != null) {
    headers = makeAuthorizationHeader(token);
  }

  return await get(getProfileUri(username), headers: headers);
}

Future<ProfileDto> getProfileAndDecode(
    {required String username, String? token}) async {
  var response = await getProfile(username: username, token: token);

  expect(response.statusCode, 200);

  final responseJson = jsonDecode(response.body);

  final profile = ProfileDto.fromJson(responseJson);

  return profile;
}

Uri followUserUri(String username) {
  return Uri.parse(host + '/profiles/$username/follow');
}

Future<Response> followUser(
    {required String followeeUsername, required String followerToken}) async {
  var headers = makeAuthorizationHeader(followerToken);

  return await post(followUserUri(followeeUsername), headers: headers);
}

Future<ProfileDto> followUserAndDecode(
    {required String followeeUsername, required String followerToken}) async {
  var response = await followUser(
      followeeUsername: followeeUsername, followerToken: followerToken);

  expect(response.statusCode, 200);

  final responseJson = jsonDecode(response.body);

  return ProfileDto.fromJson(responseJson);
}

Uri unfollowUserUri(String username) {
  return Uri.parse(host + '/profiles/$username/follow');
}

Future<Response> unfollowUser(
    {required String followeeUsername, required String followerToken}) async {
  var headers = makeAuthorizationHeader(followerToken);

  return await delete(unfollowUserUri(followeeUsername), headers: headers);
}

Future<ProfileDto> unfollowUserAndDecode(
    {required String followeeUsername, required String followerToken}) async {
  var response = await unfollowUser(
      followeeUsername: followeeUsername, followerToken: followerToken);

  expect(response.statusCode, 200);

  final responseJson = jsonDecode(response.body);

  return ProfileDto.fromJson(responseJson);
}
