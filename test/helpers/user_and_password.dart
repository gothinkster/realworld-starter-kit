import 'package:dart_shelf_realworld_example_app/src/users/dtos/user_dto.dart';

class UserAndPassword {
  final UserDto user;
  final String password;

  UserAndPassword({required this.user, required this.password});
}
