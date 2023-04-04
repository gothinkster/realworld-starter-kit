CREATE TABLE users
(
    user_id  INTEGER PRIMARY KEY,
    email    TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    bio      TEXT,
    image    TEXT
);

CREATE TABLE followers
(
    user_id     INTEGER NOT NULL REFERENCES users (user_id),
    follower_id INTEGER NOT NULL REFERENCES users (user_id),
    PRIMARY KEY (user_id, follower_id)
);

CREATE TABLE articles
(
    slug        TEXT PRIMARY KEY,
    title       TEXT    NOT NULL,
    description TEXT,
    body        TEXT    NOT NULL,
    created_at  INTEGER NOT NULL,
    updated_at  INTEGER NOT NULL,
    author_id   INTEGER NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users (user_id)
);

CREATE TABLE tags_articles
(
    tag          TEXT NOT NULL,
    article_slug TEXT NOT NULL,
    FOREIGN KEY (article_slug) REFERENCES articles (slug) ON UPDATE CASCADE,
    PRIMARY KEY (tag, article_slug)
);

CREATE TABLE favorites_articles
(
    profile_id   INTEGER NOT NULL,
    article_slug TEXT    NOT NULL,
    FOREIGN KEY (article_slug) REFERENCES articles (slug) ON UPDATE CASCADE,
    FOREIGN KEY (profile_id) REFERENCES users (user_id),
    PRIMARY KEY (profile_id, article_slug)
);

CREATE TABLE comments_articles
(
    comment_id   INTEGER PRIMARY KEY,
    article_slug TEXT    NOT NULL REFERENCES articles (slug) ON UPDATE CASCADE,
    created_at   INTEGER NOT NULL,
    updated_at   INTEGER NOT NULL,
    author_id    INTEGER NOT NULL REFERENCES users (user_id),
    body         TEXT    NOT NULL
)
