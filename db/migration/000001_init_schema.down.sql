DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS article_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS follows;
DROP TABLE IF EXISTS users;

DROP INDEX IF EXISTS idx_users_username;
DROP INDEX IF EXISTS idx_users_email;
DROP INDEX IF EXISTS idx_articles_user_id;
DROP INDEX IF EXISTS idx_articles_slug;