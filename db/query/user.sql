-- name: CreateUser :one
INSERT INTO users (
    id,
    username,
    email,
    password 
) VALUES (
    $1,
    $2,
    $3,
    $4
) 
RETURNING *;


-- name: GetUserByEmail :one
SELECT *
FROM users 
WHERE email = $1;

-- name: GetUser :one
SELECT *
FROM users
WHERE id = $1;

-- name: DoesUserExist :one
SELECT EXISTS (
    SELECT 1
    FROM users
    WHERE id = $1
);

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

-- name: FollowUser :exec
INSERT INTO follows (
    follower_id,
    following_id
) VALUES (
    $1,
    $2
);

-- name: IsFollowing :one
SELECT EXISTS (
    SELECT 1
    FROM follows
    WHERE follower_id = $1
    AND following_id = $2
);

-- name: UnfollowUser :exec
DELETE FROM follows
WHERE follower_id = $1
AND following_id = $2;

-- name: GetFollowees :many
SELECT *
FROM follows
WHERE follower_id = $1;