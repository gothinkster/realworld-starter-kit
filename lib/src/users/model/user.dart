import 'package:dart_shelf_realworld_example_app/src/common/model/base_entity.dart';

class User extends BaseEntity {
  final String username;
  final String email;
  final String? bio;
  final String? image;

  User(
      {required String id,
      required this.username,
      required this.email,
      this.bio,
      this.image,
      required DateTime createdAt,
      required DateTime updatedAt})
      : super(id: id, createdAt: createdAt, updatedAt: updatedAt);
}
