-- name: GetArticleBySlug :one
SELECT a.id,
       a.slug,
       a.title,
       a.description,
       a.body,
       array_agg(t.name)::varchar[] as tag_list,
       a.created_at,
       a.updated_at, 
       count(f.article_id) as favorites_count,
       u.username,
       u.bio,
       u.image
FROM articles a, tags t
LEFT JOIN users u ON a.author_id = u.id
LEFT JOIN favorites f ON a.id = f.article_id
LEFT JOIN article_tags a_t ON a.id = a_t.article_id
WHERE slug = $1;

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