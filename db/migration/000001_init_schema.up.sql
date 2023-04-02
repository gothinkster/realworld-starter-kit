CREATE extension IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users(
  id uuid DEFAULT uuid_generate_v4(),
  username VARCHAR NOT NULL UNIQUE,
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  bio VARCHAR,
  image VARCHAR,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS follows (
  follower_id uuid NOT NULL,
  following_id uuid NOT NULL,
  
  FOREIGN KEY (follower_id) REFERENCES users(id),
  FOREIGN KEY (following_id) REFERENCES users(id)
);


CREATE TABLE IF NOT EXISTS articles (
  id uuid DEFAULT uuid_generate_v4(),
  author_id uuid NOT NULL,
  slug VARCHAR NOT NULL UNIQUE,
  title VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  body VARCHAR NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  
  PRIMARY KEY (id),
  FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS comments (
  id uuid DEFAULT uuid_generate_v4(),
  author_id uuid NOT NULL,
  article_id uuid NOT NULL,
  body VARCHAR NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  
  PRIMARY KEY (id),
  FOREIGN KEY (author_id) REFERENCES users(id),
  FOREIGN KEY (article_id) REFERENCES articles(id)
);


CREATE TABLE IF NOT EXISTS tags (
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL UNIQUE,
  
  PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS article_tags (
  article_id uuid NOT NULL,
  tag_id uuid NOT NULL,
  
  PRIMARY KEY (article_id, tag_id),
  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);


CREATE TABLE IF NOT EXISTS favorites (
  article_id uuid NOT NULL,
  user_id uuid NOT NULL,
  
  PRIMARY KEY (article_id, user_id),
  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users (username);
-- CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);

CREATE INDEX IF NOT EXISTS idx_articles_user_id ON articles (author_id);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles (slug);

-- we can ADD indexes later IF we need them
