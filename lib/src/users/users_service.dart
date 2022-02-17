import 'package:dart_shelf_realworld_example_app/src/common/exceptions/already_exists_exception.dart';
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
    username = username.trim();
    email = email.trim();

    if (username.isEmpty) {
      throw ArgumentException(
          message: 'username cannot be blank', parameterName: 'username');
    }

    if (email.isEmpty) {
      throw ArgumentException(
          message: 'email cannot be blank', parameterName: 'email');
    }

    if (!EmailValidator.validate(email)) {
      throw ArgumentException(
          message: 'Invalid email: $email', parameterName: 'email');
    }

    // See https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#implement-proper-password-strength-controls
    final passwordMinLength = 8;
    final passwordMaxLength = 64;

    if (password.length < passwordMinLength) {
      throw ArgumentException(
          message:
              'Password length must be greater than or equal to $passwordMinLength',
          parameterName: 'password');
    }

    if (password.length > passwordMaxLength) {
      throw ArgumentException(
          message:
              'Password length must be less than or equal to $passwordMaxLength',
          parameterName: 'password');
    }

    var alreadyExistingUser = await getUserByEmail(email);

    if (alreadyExistingUser != null) {
      throw AlreadyExistsException(
          message: 'User already exists', parameterName: 'email');
    }

    final sql =
        "INSERT INTO $usersTable(username, email, password_hash) VALUES (@username, @email, crypt(@password, gen_salt('bf'))) RETURNING id, created_at, updated_at;";

    final result = await connection.query(sql, substitutionValues: {
      'username': username,
      'email': email,
      'password': password
    });

    final userRow = result[0];
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

  Future<User?> getUserByEmail(String email) async {
    final sql =
        'SELECT id, username, bio, image, created_at, updated_at FROM $usersTable WHERE email = @email;';

    final result =
        await connection.query(sql, substitutionValues: {'email': email});

    if (result.isEmpty) {
      return null;
    }

    final userRow = result[0];

    final userId = userRow[0];
    final username = userRow[1];
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

  Future<User?> getUserByEmailAndPassword(String email, String password) async {
    final sql =
        'SELECT id, username, bio, image, created_at, updated_at FROM $usersTable WHERE email = @email AND password_hash = crypt(@password, password_hash);';

    final result = await connection
        .query(sql, substitutionValues: {'email': email, 'password': password});

    if (result.isEmpty) {
      return null;
    }

    final userRow = result[0];

    final userId = userRow[0];
    final username = userRow[1];
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

  Future<User> updateUserByEmail(String email,
      {String? username,
      String? emailForUpdate,
      String? password,
      String? bio,
      String? image}) async {
    final initialSql = 'UPDATE $usersTable';

    var sql = initialSql;

    if (username != null) {
      if (sql == initialSql) {
        sql = sql + ' SET username = @username';
      } else {
        sql = sql + ', username = @username';
      }
    }

    if (emailForUpdate != null) {
      if (sql == initialSql) {
        sql = sql + ' SET email = @emailForUpdate';
      } else {
        sql = sql + ', email = @emailForUpdate';
      }
    }

    if (password != null) {
      if (sql == initialSql) {
        sql = sql + " SET password_hash = crypt(@password, gen_salt('bf'))";
      } else {
        sql = sql + ", password_hash = crypt(@password, gen_salt('bf'))";
      }
    }

    if (bio != null) {
      if (sql == initialSql) {
        sql = sql + ' SET bio = @bio';
      } else {
        sql = sql + ', bio = @bio';
      }
    }

    if (image != null) {
      if (sql == initialSql) {
        sql = sql + ' SET image = @image';
      } else {
        sql = sql + ', image = @image';
      }
    }

    var updatedEmail = email;
    if (sql != initialSql) {
      sql = sql + ' WHERE email = @email RETURNING email;';

      final result = await connection.query(sql, substitutionValues: {
        'email': email,
        'username': username,
        'emailForUpdate': emailForUpdate,
        'password': password,
        'bio': bio,
        'image': image
      });

      updatedEmail = result[0][0];
    }

    final user = await getUserByEmail(updatedEmail);

    if (user == null) {
      throw AssertionError(
          "User cannot be null at this point. Email: $email. Updated Email: $updatedEmail");
    }

    return user;
  }
}
