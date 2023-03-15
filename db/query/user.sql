-- name: CreateUser :one
INSERT INTO users (
    username,
    email,
    password 
) VALUES (
    $1,
    $2,
    $3
) 
RETURNING *;


-- name: GetUserByEmail :one
SELECT *
FROM users 
WHERE email = $1;

-- name: GetUserByID :one
SELECT *
FROM users
WHERE id = $1;

-- name: GetUserByUsername :one
SELECT *
FROM users
WHERE username = $1;

-- name: UpdateUser :one
UPDATE users
SET username = coalesce(sqlc.narg('username'), username),
    email = coalesce(sqlc.narg('email'), email),
    password = coalesce(sqlc.narg('password'), password),
    bio = coalesce(sqlc.narg('bio'), bio),
    image = coalesce(sqlc.narg('image'), image),
    updated_at = now()
WHERE id = sqlc.arg('id')
RETURNING *;