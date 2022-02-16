import 'package:dart_shelf_realworld_example_app/src/common/exceptions/argument_exception.dart';
import 'package:dart_shelf_realworld_example_app/src/users/model/user.dart';
import 'package:email_validator/email_validator.dart';
import 'package:postgres/postgres.dart';

class UsersService {
  static String usersTable = 'users';

  final PostgreSQLConnection connection;

  UsersService({required this.connection});

  Future<User> createUser(
      String username, String email, String password) async {
    if (!EmailValidator.validate(email)) {
      throw ArgumentException(
          message: 'Invalid email: $email', parameterName: 'email');
    }

    final sql =
        "INSERT INTO $usersTable(username, email, password_hash) VALUES (@username, @email, crypt(@password, gen_salt('bf'))) RETURNING id, created_at, updated_at;";

    var results = await connection.query(sql, substitutionValues: {
      'username': username,
      'email': email,
      'password': password
    });

    final userRow = results[0];
    final userId = userRow[0];
    final createdAt = userRow[1];
    final updatedAt = userRow[2];

    return User(
        id: userId,
        username: username,
        email: email,
        createdAt: createdAt,
        updatedAt: updatedAt);
  }

  Future<User> getUserByUsername(String username) async {
    final sql =
        'SELECT id, email, bio, image, created_at, updated_at FROM $usersTable WHERE username = @username;';

    var results =
        await connection.query(sql, substitutionValues: {'username': username});

    final userRow = results[0];

    final userId = userRow[0];
    final email = userRow[1];
    final bio = userRow[2];
    final image = userRow[3];
    final createdAt = userRow[4];
    final updatedAt = userRow[5];

    return User(
        id: userId,
        username: username,
        email: email,
        bio: bio,
        image: image,
        createdAt: createdAt,
        updatedAt: updatedAt);
  }

  Future<bool> verifyPassword(String username, String password) async {
    final sql =
        'SELECT password_hash = crypt(@password, password_hash) FROM $usersTable WHERE username = @username;';

    var results = await connection.query(sql,
        substitutionValues: {'username': username, 'password': password});

    return results[0][0];
  }
}
