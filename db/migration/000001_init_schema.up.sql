CREATE TABLE IF NOT EXISTS users(
  id text not null,
  username text not null unique,
  email text not null unique,
  password text not null,
  bio text,
  image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS follows (
  follower_id text not null,
  following_id text not null,
  
  FOREIGN KEY (follower_id) REFERENCES users(id),
  FOREIGN KEY (following_id) REFERENCES users(id)
);


CREATE TABLE IF NOT EXISTS articles (
  id text not null,
  author_id text not null,
  slug text not null unique,
  title text not null,
  description text not null,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  
  PRIMARY KEY (id),
  FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS comments (
  id text not null,
  author_id text not null,
  article_id text not null,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  
  PRIMARY KEY (id),
  FOREIGN KEY (author_id) REFERENCES users(id),
  FOREIGN KEY (article_id) REFERENCES articles(id)
);


CREATE TABLE IF NOT EXISTS tags (
  id text not null,
  name text not null unique,
  
  PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS article_tags (
  article_id text not null,
  tag_id text not null,
  
  PRIMARY KEY (article_id, tag_id),
  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);


CREATE TABLE IF NOT EXISTS favorites (
  article_id text not null,
  user_id text not null,
  
  PRIMARY KEY (article_id, user_id),
  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users (username);
-- CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);

CREATE INDEX IF NOT EXISTS idx_articles_user_id ON articles (author_id);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles (slug);

-- we can ADD indexes later IF we need them
