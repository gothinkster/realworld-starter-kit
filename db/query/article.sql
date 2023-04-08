-- name: GetArticleBySlug :one
SELECT a.id,
       a.slug,
       a.title,
       a.description,
       a.body,
       array_agg(t.name) filter (where t.name is not null) AS tag_list,
       a.created_at,
       a.updated_at,
       count(distinct f.user_id) as favorites_count,
       u.id as author_id,
       u.username,
       u.bio,
       u.image
FROM articles a
LEFT  JOIN article_tags art ON a.id = art.article_id
LEFT JOIN tags t ON art.tag_id = t.id
LEFT  JOIN favorites f ON a.id = f.article_id
LEFT  JOIN users u ON a.author_id = u.id
WHERE a.slug = $1
GROUP BY  a.id, a.slug, a.title, a.description, a.body, 
          a.created_at, a.updated_at, u.id;

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
DO NOTHING
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
WHERE id = sqlc.arg('id') and author_id = sqlc.arg('author_id')
RETURNING *;

-- name: GetArticleIDBySlug :one
SELECT id
FROM articles
WHERE slug = $1;

-- name: DeleteArticle :exec
DELETE FROM articles
WHERE slug = $1 and author_id = $2;

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
    u.id as author_id,
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

-- name: ListArticlesByTag :many
SELECT a.id,
       a.slug,
       a.title,
       a.description,
       a.body,
       array_agg(t.name) AS tag_list,
       a.created_at,
       a.updated_at,
       coalesce(count(f.article_id), 0)::int as favorites_count, 
       u.username,
       u.bio,
       u.image
FROM articles a
LEFT JOIN article_tags art ON a.id = art.article_id
LEFT JOIN tags t ON art.tag_id = t.id
LEFT JOIN (
  SELECT   article_id
  FROM     favorites
  GROUP BY article_id
) f ON a.id = f.article_id
LEFT JOIN users u ON a.author_id = u.id
WHERE t.name = $1
GROUP BY  a.id, a.slug, a.title, a.description, a.body, 
          a.created_at, a.updated_at, u.id
ORDER BY a.created_at DESC
LIMIT $2 OFFSET $3;


-- name: CountArticlesByTag :one
SELECT count(*)
FROM articles a
LEFT JOIN article_tags art ON a.id = art.article_id
LEFT JOIN tags t ON art.tag_id = t.id
WHERE t.name = $1;

-- name: ListArticlesByAuthor :many
SELECT a.id,
       a.slug,
       a.title,
       a.description,
       a.body,
       array_agg(t.name) AS tag_list,
       a.created_at,
       a.updated_at,
       coalesce(count(f.article_id), 0)::int as favorites_count, 
       u.username,
       u.bio,
       u.image
FROM articles a
LEFT JOIN article_tags art ON a.id = art.article_id
LEFT JOIN tags t ON art.tag_id = t.id
LEFT JOIN (
  SELECT   article_id
  FROM     favorites
  GROUP BY article_id
) f ON a.id = f.article_id
LEFT JOIN users u ON a.author_id = u.id
WHERE u.username = $1
GROUP BY  a.id, a.slug, a.title, a.description, a.body, 
          a.created_at, a.updated_at, u.id
ORDER BY a.created_at DESC
LIMIT $2 OFFSET $3;


-- name: CountArticlesByAuthor :one
SELECT count(*)
FROM articles a
LEFT JOIN users u ON a.author_id = u.id
WHERE u.username = $1;

-- name: ListArticlesByFavorited :many
SELECT a.id,
       a.slug,
       a.title,
       a.description,
       a.body,
       array_agg(t.name) AS tag_list,
       a.created_at,
       a.updated_at,
       coalesce(count(f.article_id), 0)::int as favorites_count, 
       u.username,
       u.bio,
       u.image
FROM articles a
LEFT JOIN article_tags art ON a.id = art.article_id
LEFT JOIN tags t ON art.tag_id = t.id
LEFT JOIN (
  SELECT   article_id
  FROM     favorites
  GROUP BY article_id
) f ON a.id = f.article_id
LEFT JOIN users u ON a.author_id = u.id
LEFT JOIN favorites fav ON a.id = fav.article_id
LEFT JOIN users u2 ON fav.user_id = u2.id
WHERE u2.username = $1
GROUP BY  a.id, a.slug, a.title, a.description, a.body, 
          a.created_at, a.updated_at, u.id
ORDER BY a.created_at DESC
LIMIT $2 OFFSET $3;

-- name: CountArticlesByFavorited :one
SELECT count(*)
FROM articles a
LEFT JOIN favorites fav ON a.id = fav.article_id
LEFT JOIN users u2 ON fav.user_id = u2.id
WHERE u2.username = $1;

-- name: ListArticles :many
SELECT a.id,
       a.slug,
       a.title,
       a.description,
       a.body,
       array_agg(t.name) AS tag_list,
       a.created_at,
       a.updated_at,
       coalesce(count(f.article_id), 0)::int as favorites_count, 
       u.username,
       u.bio,
       u.image
FROM articles a
LEFT JOIN article_tags art ON a.id = art.article_id
LEFT JOIN tags t ON art.tag_id = t.id
LEFT JOIN (
  SELECT   article_id
  FROM     favorites
  GROUP BY article_id
) f ON a.id = f.article_id
LEFT JOIN users u ON a.author_id = u.id
GROUP BY  a.id, a.slug, a.title, a.description, a.body, 
          a.created_at, a.updated_at, u.id
ORDER BY a.created_at DESC
LIMIT $1 OFFSET $2;

-- name: CountArticles :one
SELECT count(*)
FROM articles;

-- name: ListArticlesByFollowing :many
SELECT a.id,
       a.slug,
       a.title,
       a.description,
       a.body,
       array_agg(t.name) AS tag_list,
       a.created_at,
       a.updated_at,
       coalesce(count(f.article_id), 0)::int as favorites_count, 
       u.username,
       u.bio,
       u.image
FROM articles a
LEFT JOIN article_tags art ON a.id = art.article_id
LEFT JOIN tags t ON art.tag_id = t.id
LEFT JOIN (
  SELECT   article_id
  FROM     favorites
  GROUP BY article_id
) f ON a.id = f.article_id
LEFT JOIN users u ON a.author_id = u.id
LEFT JOIN follows f2 ON u.id = f2.followee_id
LEFT JOIN users u2 ON f2.follower_id = u2.id
WHERE u2.username = $1
GROUP BY  a.id, a.slug, a.title, a.description, a.body, 
          a.created_at, a.updated_at, u.id
ORDER BY a.created_at DESC
LIMIT $2 OFFSET $3;

-- name: CountArticlesByFollowing :one
SELECT count(*)
FROM articles a
LEFT JOIN users u ON a.author_id = u.id
LEFT JOIN follows f2 ON u.id = f2.followee_id
LEFT JOIN users u2 ON f2.follower_id = u2.id
WHERE u2.username = $1;


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
