import 'package:postgres/postgres.dart';

class InitialCreate {
  final PostgreSQLConnection connection;

  InitialCreate(this.connection);

  Future<void> up() async {
    await connection.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;');
    await connection.query(
        'CREATE TABLE IF NOT EXISTS users(id UUID PRIMARY KEY DEFAULT gen_random_uuid(), username VARCHAR(32) NOT NULL UNIQUE, email VARCHAR(254) NOT NULL UNIQUE, password_hash TEXT NOT NULL, bio TEXT, image text, created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp, updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp);');
  }

  Future<void> down() async {
    await connection.query('DROP TABLE IF EXISTS users;');
  }
}
