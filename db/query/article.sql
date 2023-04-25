-- name: GetArticleBySlug :one
WITH article_cte AS (
	SELECT * 
	FROM articles 
	WHERE slug = $1
), 
favorites AS (
	SELECT COUNT(*) AS count
	FROM favorites
	WHERE article_id = (SELECT id FROM article_cte LIMIT 1)
), 
tags AS (
	SELECT array_agg(t.name) FILTER (WHERE t.name IS NOT NULL) AS list
	FROM tags t
	LEFT JOIN article_tags at ON t.id = at.tag_id
	WHERE at.article_id = (SELECT id FROM article_cte LIMIT 1)
), 
author AS (
	SELECT * 
  FROM users 
  WHERE id = (SELECT author_id FROM article_cte LIMIT 1)
)
SELECT  article_cte.id,
        article_cte.slug,
        article_cte.title,
        article_cte.description,
        article_cte.body,
        article_cte.created_at,
        article_cte.updated_at,
        favorites.count AS favorites_count, 
	      tags.list AS tag_list,
        author.id AS author_id,
	      author.username,
        author.bio,
        author.image
FROM article_cte, favorites, tags, author;	

-- name: CreateArticle :one
INSERT INTO articles (
    id,
    author_id,
    slug,
    title,
    description,
    body
) VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
)
RETURNING *;

-- name: CreateTag :one
INSERT INTO tags (
    id,
    name
) VALUES (
    $1,
    $2
)
ON CONFLICT 
    ON CONSTRAINT tags_name_key
DO UPDATE SET name = $2
RETURNING id;    

-- name: CreateArticleTag :one
INSERT INTO article_tags (
    article_id,
    tag_id
) VALUES (
    $1,
    $2
)
RETURNING *;

-- name: UpdateArticle :one
UPDATE articles
SET slug = coalesce(sqlc.narg('slug'), slug),
    title = coalesce(sqlc.narg('title'), title),
    description = coalesce(sqlc.narg('description'), description),
    body = coalesce(sqlc.narg('body'), body),
    updated_at = now()
WHERE id = sqlc.arg('id') AND author_id = sqlc.arg('author_id')
RETURNING *;

-- name: GetArticleIDBySlug :one
SELECT id
FROM articles
WHERE slug = $1;

-- name: GetArticleAuthorID :one
SELECT author_id
FROM articles
WHERE slug = $1;

-- name: GetArticleAuthorIDBySlug :one
SELECT id, author_id
FROM articles
WHERE slug = $1;


-- name: DeleteArticle :exec
DELETE FROM articles
WHERE slug = $1;

-- name: AddComment :one
INSERT INTO comments (
    id,
    author_id,
    article_id,
    body
) VALUES (
    $1,
    $2,
    $3,
    $4
)
RETURNING *;


-- name: GetCommentsBySlug :many
SELECT 
    c.id,
    c.body,
    c.created_at,
    c.updated_at,
    u.id AS author_id,
    u.username,
    u.bio,
    u.image     
FROM (
    SELECT id
    FROM articles
    WHERE slug = $1
) a
LEFT JOIN comments c ON a.id = c.article_id 
LEFT JOIN users u ON c.author_id = u.id;

-- name: GetArticlesByTag :many
WITH article_tags_cte AS (
	SELECT *
	FROM article_tags at
	LEFT JOIN tags t ON at.tag_id = t.id
	WHERE t.name = $1
  LIMIT $2 OFFSET $3
),  
  articles_cte AS (
	SELECT *
	FROM articles 
	WHERE id = ANY(SELECT article_id FROM article_tags_cte)
),
	users_cte AS (
	SELECT * 
	FROM users 
	WHERE id = ANY(SELECT author_id FROM articles_cte)
), 
	tags_cte AS (
	SELECT array_agg(t.name) list,
		   at.article_id		
	FROM article_tags at
	LEFT JOIN tags t ON at.tag_id = t.id
	WHERE at.article_id = ANY(SELECT id FROM articles_cte)
	GROUP BY at.article_id
), 
 	favorites_cte AS (
	SELECT COUNT(*) COUNT,
	       article_id
	FROM favorites 
	WHERE article_id = ANY(SELECT id FROM articles_cte)
	GROUP BY article_id
)	
SELECT a.id,
      a.slug,
      a.title,
      a.description,
      a.body,
      a.created_at,
      a.updated_at, 
      f.count AS favorites_count,
	    CASE WHEN '' <> $4::text AND EXISTS (
            SELECT 1 FROM favorites f 
            WHERE f.article_id = a.id 
            AND f.user_id = $4::text
      ) THEN true 
        ELSE false 
      END AS favorited,
      CASE WHEN '' <> $4::text AND EXISTS (
            SELECT 1 FROM follows f 
            WHERE f.following_id = a.author_id 
            AND f.follower_id = $4::text
      ) THEN true 
        ELSE false 
      END AS following,  
      t.list AS tag_list,  
      u.username,
      u.bio,
      u.image
FROM articles_cte a
LEFT JOIN users_cte u ON a.author_id = u.id
LEFT JOIN tags_cte t ON a.id = t.article_id
LEFT JOIN favorites_cte f ON a.id = f.article_id
ORDER BY a.updated_at DESC;


-- name: CountArticlesByTag :one
SELECT COUNT(*)
FROM articles a
LEFT JOIN article_tags art ON a.id = art.article_id
LEFT JOIN tags t ON art.tag_id = t.id
WHERE t.name = $1;

-- name: GetArticlesByAuthor :many
WITH author_cte AS (
	SELECT id
	FROM users u
	WHERE u.username = $1
),  
  articles_cte AS (
	SELECT *
	FROM articles 
	WHERE author_id = ANY(SELECT id FROM author_cte)
  LIMIT $2 OFFSET $3
),
	users_cte AS (
	SELECT * 
	FROM users 
	WHERE id = ANY(SELECT author_id FROM articles_cte)
), 
	tags_cte AS (
	SELECT array_agg(t.name) list,
		   at.article_id		
	FROM article_tags at
	LEFT JOIN tags t ON at.tag_id = t.id
	WHERE at.article_id = ANY(SELECT id FROM articles_cte)
	GROUP BY at.article_id
), 
 	favorites_cte AS (
	SELECT COUNT(*) COUNT,
	       article_id
	FROM favorites 
	WHERE article_id = ANY(SELECT id FROM articles_cte)
	GROUP BY article_id
)	
SELECT a.id,
      a.slug,
      a.title,
      a.description,
      a.body,
      a.created_at,
      a.updated_at, 
      f.count AS favorites_count,
	    CASE WHEN '' <> $4::text AND EXISTS (
            SELECT 1 FROM favorites f 
            WHERE f.article_id = a.id 
            AND f.user_id = $4::text
      ) THEN true 
        ELSE false 
      END AS favorited,
      CASE WHEN '' <> $4::text AND EXISTS (
            SELECT 1 FROM follows f 
            WHERE f.following_id = a.author_id 
            AND f.follower_id = $4::text
      ) THEN true 
        ELSE false 
      END AS following,  
      t.list AS tag_list,  
      u.username,
      u.bio,
      u.image
FROM articles_cte a
LEFT JOIN users_cte u ON a.author_id = u.id
LEFT JOIN tags_cte t ON a.id = t.article_id
LEFT JOIN favorites_cte f ON a.id = f.article_id
ORDER BY a.updated_at DESC;


-- name: CountArticlesByAuthor :one
SELECT COUNT(*)
FROM articles a
LEFT JOIN users u ON a.author_id = u.id
WHERE u.username = $1;

-- name: GetArticlesByFavorited :many
WITH user_cte AS (
	SELECT * 
	FROM users 
	WHERE username = $1
), 
  favorited_cte AS (
	SELECT article_id
	FROM favorites 
	WHERE user_id = any(SELECT id FROM user_cte)
  LIMIT $2 OFFSET $3
),  
  articles_cte AS (
	SELECT *
	FROM articles
	WHERE id = any(SELECT article_id FROM favorited_cte)
),
	tags_cte AS (
	SELECT array_agg(t.name) list,
		   at.article_id		
	FROM article_tags at
	LEFT JOIN tags t ON at.tag_id = t.id
	WHERE at.article_id = ANY(SELECT id FROM articles_cte)
	GROUP BY at.article_id
), 
 	favorites_cte AS (
	SELECT COUNT(*) COUNT,
	       f.article_id
	FROM favorites f
	WHERE f.article_id = ANY(SELECT id FROM articles_cte)
	GROUP BY f.article_id
)	
SELECT a.id,
      a.slug,
      a.title,
      a.description,
      a.body,
      a.created_at,
      a.updated_at, 
      f.count AS favorites_count,
	    CASE WHEN '' <> $4::text AND EXISTS (
            SELECT 1 FROM favorites f 
            WHERE f.article_id = a.id 
            AND f.user_id = $4::text
      ) THEN true 
        ELSE false 
      END AS favorited,
	    CASE WHEN '' <> $4::text AND EXISTS (
            SELECT 1 FROM follows f 
            WHERE f.following_id = a.author_id 
            AND f.follower_id = $4::text
      ) THEN true 
        ELSE false 
      END AS following, 	  
      t.list AS tag_list,  
      u.username,
      u.bio,
      u.image
FROM articles_cte a
LEFT JOIN user_cte u ON a.author_id = u.id
LEFT JOIN tags_cte t ON a.id = t.article_id
LEFT JOIN favorites_cte f ON a.id = f.article_id
ORDER BY a.updated_at DESC;

-- name: CountArticlesByFavorited :one
SELECT COUNT(*)
FROM articles a
LEFT JOIN favorites f ON a.id = f.article_id
LEFT JOIN users u ON f.user_id = u.id
WHERE u.username = $1;

-- name: GetArticles :many
WITH articles_cte as (
	SELECT *
	FROM articles a
	LIMIT $1 OFFSET $2
),
	users_cte AS (
	SELECT * 
	FROM users 
	WHERE id = ANY(SELECT author_id FROM articles_cte)
), 
	tags_cte AS (
	SELECT array_agg(t.name) list,
		   at.article_id		
	FROM article_tags at
	LEFT JOIN tags t ON at.tag_id = t.id
	WHERE at.article_id = ANY(SELECT id FROM articles_cte)
	GROUP BY at.article_id
), 
 	favorites_cte AS (
	SELECT COUNT(*) COUNT,
	       article_id
	FROM favorites 
	WHERE article_id = ANY(SELECT id FROM articles_cte)
	GROUP BY article_id
)	
SELECT a.id,
      a.slug,
      a.title,
      a.description,
      a.body,
      a.created_at,
      a.updated_at, 
      f.count AS favorites_count,
	    CASE WHEN '' <> $3::text AND EXISTS (
            SELECT 1 FROM favorites f 
            WHERE f.article_id = a.id 
            AND f.user_id = $3::text
      ) THEN true 
        ELSE false 
      END AS favorited,
	    CASE WHEN '' <> $3::text AND EXISTS (
            SELECT 1 FROM follows f 
            WHERE f.following_id = a.author_id 
            AND f.follower_id = $3::text
      ) THEN true 
        ELSE false 
      END AS following, 
      t.list AS tag_list,  
      u.username,
      u.bio,
      u.image
FROM articles_cte a
LEFT JOIN users_cte u ON a.author_id = u.id
LEFT JOIN tags_cte t ON a.id = t.article_id
LEFT JOIN favorites_cte f ON a.id = f.article_id
ORDER BY a.created_at DESC;

-- name: CountArticles :one
SELECT COUNT(*)
FROM articles;

-- name: GetCommentAuthorID :one
SELECT c.author_id
FROM comments c
WHERE c.id = $1
LIMIT 1;        

-- name: DeleteComment :exec
DELETE FROM comments
WHERE id = $1;

-- name: DoesFavoriteExist :one
SELECT EXISTS (
  SELECT 1
  FROM favorites
  WHERE user_id = $1 AND article_id = $2
);

-- name: FavoriteArticle :exec
INSERT INTO favorites (user_id, article_id)
VALUES ($1, $2);

-- name: UnfavoriteArticle :exec
DELETE FROM favorites
WHERE user_id = $1 AND article_id = $2;

-- name: GetTags :many
SELECT name
FROM tags;

-- name: IsFollowingList :one
SELECT ARRAY(
  SELECT EXISTS (
    SELECT 1 FROM follows
    WHERE follower_id = $1 AND following_id = id
  )
  FROM unnest(@following_id::text[]) AS id
)::bool[];

-- name: GetArticlesFeed :many
WITH follows_cte AS (
	SELECT following_id
	FROM follows
	WHERE follower_id = $1
), 
  articles_cte AS (
	SELECT *
	FROM articles
	WHERE author_id = ANY(SELECT * FROM follows_cte)
  LIMIT $2 OFFSET $3
), 
  users_cte AS (
  SELECT * 
  FROM users 
  WHERE id = ANY(SELECT following_id FROM follows_cte)
  
), 
  article_tags_cte AS (
	SELECT array_agg(t.name) list,
		   at.article_id		
	FROM article_tags at
	LEFT JOIN tags t ON at.tag_id = t.id
	WHERE at.article_id = ANY(SELECT id FROM articles_cte)
	GROUP BY at.article_id
), 
  favorites_cte AS (
	SELECT COUNT(*) COUNT,
	       article_id
	FROM favorites 
	WHERE article_id = ANY(SELECT id FROM articles_cte)
	GROUP BY article_id
)	
SELECT a.id,
      a.slug,
      a.title,
      a.description,
      a.body,
      a.created_at,
      a.updated_at, 
      fc.count AS favorites_count,
      CASE WHEN EXISTS (
            SELECT 1 FROM favorites f 
            WHERE f.article_id = a.id 
            AND f.user_id = $1
      ) THEN true 
        ELSE false 
      END AS favorited, 
      atc.list AS tag_list,  
      u.username,
      u.bio,
      u.image
FROM articles_cte AS a
LEFT JOIN users_cte u ON a.author_id = u.id
LEFT JOIN article_tags_cte atc ON a.id = atc.article_id
LEFT JOIN favorites_cte fc ON a.id = fc.article_id
ORDER BY a.updated_at DESC;

-- name: CountArticlesFeed :one
WITH follows_cte AS (
	SELECT following_id
	FROM follows
	WHERE follower_id = $1
)
SELECT COUNT(*)
FROM articles a
WHERE a.author_id = ANY(SELECT following_id FROM follows_cte);

