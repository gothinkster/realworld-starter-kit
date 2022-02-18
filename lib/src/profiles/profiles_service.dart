import 'package:dart_shelf_realworld_example_app/src/common/exceptions/not_found_exception.dart';
import 'package:dart_shelf_realworld_example_app/src/profiles/model/follow.dart';
import 'package:postgres/postgres.dart';

import '../users/users_service.dart';

class ProfilesService {
  static String followsTable = 'follows';

  final PostgreSQLConnection connection;
  final UsersService usersService;

  ProfilesService({required this.connection, required this.usersService});

  Future<Follow> createFollow(String followerId, String followeeId) async {
    final followerUser = await usersService.getUserById(followerId);

    if (followerUser == null) {
      throw NotFoundException(message: 'Follower not found');
    }

    final followeeUser = await usersService.getUserById(followerId);

    if (followeeUser == null) {
      throw NotFoundException(message: 'Followee not found');
    }

    final sql =
        "INSERT INTO $followsTable(follower_id, followee_id) VALUES (@followerId, @followeeId) RETURNING id, created_at, updated_at;";

    final result = await connection.query(sql, substitutionValues: {
      'followerId': followerId,
      'followeeId': followeeId,
    });

    final followRow = result[0];
    final followId = followRow[0];
    final createdAt = followRow[1];
    final updatedAt = followRow[2];

    return Follow(
        id: followId,
        followerId: followId,
        followeeId: followeeId,
        createdAt: createdAt,
        updatedAt: updatedAt);
  }

  Future<bool> isFollowing(String followerId, String followeeId) async {
    final sql =
        'SELECT EXISTS(SELECT 1 FROM $followsTable WHERE follower_id = @followerId AND followee_id = @followeeId);';

    final result = await connection.query(sql, substitutionValues: {
      'followerId': followerId,
      'followeeId': followeeId,
    });

    if (result.isEmpty) {
      return false;
    }

    return true;
  }
}
