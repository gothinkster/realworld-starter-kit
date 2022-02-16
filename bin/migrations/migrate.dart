import 'package:dotenv/dotenv.dart' show load, env;
import 'package:postgres/postgres.dart';

import '20220215161400_initial_create.dart';

void main(List<String> args) async {
  load();

  final dbHost = env['DB_HOST'];
  final envDbPort = env['DB_PORT'];
  final dbName = env['DB_NAME'];
  final dbUser = env['DB_USER'];
  final dbPassword = env['DB_PASSWORD'];

  if (dbHost == null) {
    throw StateError('Environment variable DB_HOST is required');
  }

  if (envDbPort == null) {
    throw StateError('Environment variable DB_PORT is required');
  }

  if (dbName == null) {
    throw StateError('Environment variable DB_NAME is required');
  }

  final dbPort = int.tryParse(envDbPort);

  if (dbPort == null) {
    throw ArgumentError('Environment variable DB_PORT must be an integer');
  }

  final connection = PostgreSQLConnection(dbHost, dbPort, dbName,
      username: dbUser, password: dbPassword);

  await connection.open();

  final initialCreate = InitialCreate(connection);

  final command = args[0].trim().toLowerCase();

  if (command == 'up') {
    await initialCreate.up();
  } else if (command == 'down') {
    await initialCreate.down();
  } else {
    throw ArgumentError('Invalid command $command');
  }

  await connection.close();
}
