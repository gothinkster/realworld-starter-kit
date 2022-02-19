CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL UNIQUE,
  email text NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  bio TEXT,
  image text,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS follows(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID references users(id),
  followee_id UUID references users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  deleted_at TIMESTAMP,
  UNIQUE(follower_id, followee_id)
);

CREATE TABLE IF NOT EXISTS articles(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID references users(id),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL,
  body text NOT NULL,
  tag_list text [] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS favorites(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID references users(id),
  article_id UUID references articles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  deleted_at TIMESTAMP,
  UNIQUE(user_id, article_id)
);
