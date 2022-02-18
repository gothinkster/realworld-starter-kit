import 'package:dart_shelf_realworld_example_app/src/common/exceptions/argument_exception.dart';
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
    if (followerId == followeeId) {
      throw ArgumentException(message: 'Cannot follow own user');
    }

    final followerUser = await usersService.getUserById(followerId);

    if (followerUser == null) {
      throw NotFoundException(message: 'Follower not found');
    }

    final followeeUser = await usersService.getUserById(followerId);

    if (followeeUser == null) {
      throw NotFoundException(message: 'Followee not found');
    }

    final existingFollow =
        await getFollowByFollowerAndFollowee(followeeUser.id, followeeUser.id);

    if (existingFollow != null) {
      return existingFollow;
    }

    final hasPreviousUnfollowSql =
        'SELECT EXISTS(SELECT 1 FROM $followsTable WHERE follower_id = @followerId AND followee_id = @followeeId AND deleted_at IS NOT NULL);';

    final hasPreviousFollowResult =
        await connection.query(hasPreviousUnfollowSql, substitutionValues: {
      'followerId': followerUser.id,
      'followeeId': followeeUser.id,
    });

    var hasPreviousFollow = hasPreviousFollowResult[0][0];

    String sql;
    if (hasPreviousFollow) {
      sql =
          'UPDATE $followsTable SET deleted_at = NULL, created_at = current_timestamp WHERE follower_id = @followerId AND followee_id = @followeeId RETURNING id, created_at, updated_at, deleted_at';
    } else {
      sql =
          'INSERT INTO $followsTable(follower_id, followee_id) VALUES (@followerId, @followeeId) RETURNING id, created_at, updated_at, deleted_at;';
    }

    final result = await connection.query(sql, substitutionValues: {
      'followerId': followerUser.id,
      'followeeId': followeeUser.id,
    });

    final followRow = result[0];

    final followId = followRow[0];
    final createdAt = followRow[1];
    final updatedAt = followRow[2];
    final deletedAt = followRow[3];

    return Follow(
        id: followId,
        followerId: followerUser.id,
        followeeId: followeeUser.id,
        createdAt: createdAt,
        updatedAt: updatedAt,
        deletedAt: deletedAt);
  }

  Future<Follow?> getFollowById(String followId) async {
    final sql =
        'SELECT follower_id, followee_id, created_at, updated_at, deleted_at FROM $followsTable WHERE id = @followId AND deleted_at IS NULL;';

    final result =
        await connection.query(sql, substitutionValues: {'followId': followId});

    if (result.isEmpty) {
      return null;
    }

    final followRow = result[0];

    final followerId = followRow[0];
    final followeeId = followRow[1];
    final createdAt = followRow[2];
    final updatedAt = followRow[3];
    final deletedAt = followRow[4];

    return Follow(
        id: followId,
        followerId: followerId,
        followeeId: followeeId,
        createdAt: createdAt,
        updatedAt: updatedAt,
        deletedAt: deletedAt);
  }

  Future<Follow?> getFollowByFollowerAndFollowee(
      String followerId, String followeeId) async {
    final sql =
        'SELECT id FROM $followsTable WHERE follower_id = @followerId AND followee_id = @followeeId AND deleted_at IS NULL;';

    final result = await connection.query(sql, substitutionValues: {
      'followerId': followerId,
      'followeeId': followeeId
    });

    if (result.isEmpty) {
      return null;
    }

    final followId = result[0][0];

    return await getFollowById(followId);
  }

  Future<void> deleteFollowByFollowerAndFollowee(
      String followerId, String followeeId) async {
    if (!(await isFollowing(followerId, followeeId))) {
      throw ArgumentException(message: 'Follow was not found');
    }

    final sql =
        "UPDATE $followsTable SET deleted_at = current_timestamp WHERE follower_id = @followerId AND followee_id = @followeeId;";

    await connection.query(sql, substitutionValues: {
      'followerId': followerId,
      'followeeId': followeeId,
    });
  }

  Future<bool> isFollowing(String followerId, String followeeId) async {
    final sql =
        'SELECT EXISTS(SELECT 1 FROM $followsTable WHERE follower_id = @followerId AND followee_id = @followeeId AND deleted_at IS NULL);';

    final result = await connection.query(sql, substitutionValues: {
      'followerId': followerId,
      'followeeId': followeeId,
    });

    return result[0][0];
  }
}
