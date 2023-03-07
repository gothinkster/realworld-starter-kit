INSERT INTO users
VALUES (1, 'admin@example.com', 'admin', 'password', 'I dont work', '');

INSERT INTO users_sessions
VALUES (1, 'admin-user-token', unixepoch() * 1000);
