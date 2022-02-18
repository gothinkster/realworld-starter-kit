import 'dart:convert';

import 'package:dart_shelf_realworld_example_app/src/common/errors/dtos/error_dto.dart';
import 'package:dart_shelf_realworld_example_app/src/profiles/dtos/profile_dto.dart';
import 'package:dart_shelf_realworld_example_app/src/profiles/profiles_service.dart';
import 'package:dart_shelf_realworld_example_app/src/users/users_service.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

import '../common/middleware/auth.dart';
import '../users/model/user.dart';

class ProfilesRouter {
  final ProfilesService profilesService;
  final UsersService usersService;
  final AuthProvider authProvider;

  ProfilesRouter(
      {required this.profilesService,
      required this.usersService,
      required this.authProvider});

  Future<Response> _getProfile(Request request) async {
    final profileUsername = request.params['username'];

    if (profileUsername == null) {
      throw UnsupportedError('username must be in the request params');
    }

    final profileUser = await usersService.getUserByUsername(profileUsername);

    if (profileUser == null) {
      return Response.notFound(
          jsonEncode(ErrorDto(errors: ['User not found'])));
    }

    var isFollowing = false;

    var authUser = request.context['user'];
    if (authUser != null) {
      authUser = authUser as User;
      isFollowing =
          await profilesService.isFollowing(authUser.id, profileUser.id);
    }

    return Response.ok(jsonEncode(ProfileDto(
        username: profileUser.username,
        bio: profileUser.bio,
        image: profileUser.image,
        following: isFollowing)));
  }

  Future<Response> _followUser(Request request) async {
    final follower = request.context['user'] as User;

    final followeeUsername = request.params['username'];

    if (followeeUsername == null) {
      throw UnsupportedError('username must be in the request params');
    }

    final followee = await usersService.getUserByUsername(followeeUsername);

    if (followee == null) {
      return Response.notFound(
          jsonEncode(ErrorDto(errors: ['User not found'])));
    }

    await profilesService.createFollow(follower.id, followee.id);

    return Response.ok(jsonEncode(ProfileDto(
        username: followee.username,
        bio: followee.bio,
        image: followee.image,
        following: true)));
  }

  Handler get router {
    final router = Router();

    router.get(
        '/profiles/<username>',
        Pipeline()
            .addMiddleware(authProvider.optionalAuth())
            .addHandler(_getProfile));

    router.post(
        '/profiles/<username>/follow',
        Pipeline()
            .addMiddleware(authProvider.requireAuth())
            .addHandler(_followUser));

    return router;
  }
}
