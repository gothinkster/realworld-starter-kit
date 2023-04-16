-- Down migration for article_tags table
ALTER TABLE article_tags
DROP CONSTRAINT article_tags_article_id_fkey;

ALTER TABLE article_tags
ADD CONSTRAINT article_tags_article_id_fkey
FOREIGN KEY (article_id) REFERENCES articles (id);

-- Down migration for comments table
ALTER TABLE comments
DROP CONSTRAINT comments_article_id_fkey;

ALTER TABLE comments
ADD CONSTRAINT comments_article_id_fkey
FOREIGN KEY (article_id) REFERENCES articles (id);

-- Down migration for favorites table
ALTER TABLE favorites
DROP CONSTRAINT favorites_article_id_fkey;

ALTER TABLE favorites
ADD CONSTRAINT favorites_article_id_fkey
FOREIGN KEY (article_id) REFERENCES articles (id);
