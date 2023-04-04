-- name: GetArticleBySlug :one
SELECT a.id,
       a.slug,
       a.title,
       a.description,
       a.body,
       coalesce(array_agg(t.name), array['default']::varchar[]) AS tag_list,
       a.created_at,
       a.updated_at,
       coalesce(count(f.article_id), 0)::bigint as favorites_count, 
       u.username,
       u.bio,
       u.image
FROM (
  SELECT *
  FROM articles
  WHERE slug = $1
  LIMIT 1
) a
LEFT JOIN (
  SELECT article_id, COUNT(*) AS favorites_count
  FROM favorites
  GROUP BY article_id
) f ON a.id = f.article_id
LEFT JOIN users u ON a.author_id = u.id
LEFT JOIN article_tags art ON a.id = art.article_id
LEFT JOIN tags t ON art.tag_id = t.id
GROUP BY a.id, a.slug, a.title, a.description, a.body, a.created_at, a.updated_at, u.id, f.favorites_count;

-- name: CreateArticle :one
INSERT INTO articles (
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
    $5
)
RETURNING *;

-- name: CreateTag :one
INSERT INTO tags (
    name
) VALUES (
    $1
)
ON CONFLICT 
    ON CONSTRAINT tags_name_key
DO 
    UPDATE SET name = $1
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