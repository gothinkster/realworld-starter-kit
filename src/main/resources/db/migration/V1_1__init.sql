CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    email TEXT NOT NULL,
    username TEXT NOT NULL,
    bio TEXT,
    image TEXT
);

CREATE TABLE articles (
    slug TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    body TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    author_id INTEGER NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users(user_id)
)