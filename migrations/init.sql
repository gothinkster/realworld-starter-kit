CREATE TABLE IF NOT EXISTS "user" (
                        "id" SERIAL PRIMARY KEY,
                        "email" varchar UNIQUE NOT NULL,
                        "salt" varchar UNIQUE NOT NULL,
                        "username" varchar UNIQUE NOT NULL,
                        "bio" varchar,
                        "image" varchar,
                        "created_at" timestamp NOT NULL DEFAULT NOW(),
                        "updated_at" timestamp,
                        "deleted_at" timestamp
);

CREATE TABLE IF NOT EXISTS "article" (
                           "id" SERIAL PRIMARY KEY,
                           "slug" varchar UNIQUE NOT NULL,
                           "title" varchar UNIQUE NOT NULL,
                           "description" varchar NOT NULL,
                           "body" varchar NOT NULL,
                           "authorId" int NOT NULL,
                           "created_at" timestamp NOT NULL DEFAULT NOW(),
                           "updated_at" timestamp,
                           "deleted_at" timestamp
);

CREATE TABLE IF NOT EXISTS "comment" (
                           "id" SERIAL PRIMARY KEY,
                           "body" varchar NOT NULL,
                           "authorId" int NOT NULL,
                           "articleId" int NOT NULL,
                           "created_at" timestamp NOT NULL DEFAULT NOW(),
                           "updated_at" timestamp,
                           "deleted_at" timestamp
);

CREATE TABLE IF NOT EXISTS "tag" (
                       "id" SERIAL PRIMARY KEY,
                       "title" varchar UNIQUE NOT NULL,
                       "created_at" timestamp NOT NULL DEFAULT NOW(),
                       "updated_at" timestamp,
                       "deleted_at" timestamp
);

CREATE TABLE IF NOT EXISTS "articleTag" (
                              "id" SERIAL PRIMARY KEY,
                              "articleId" int NOT NULL,
                              "tagId" int NOT NULL,
                              "created_at" timestamp NOT NULL DEFAULT NOW(),
                              "updated_at" timestamp,
                              "deleted_at" timestamp
);

CREATE TABLE IF NOT EXISTS "followers" (
                             "id" SERIAL PRIMARY KEY,
                             "userId" int NOT NULL,
                             "followerId" int NOT NULL,
                             "created_at" timestamp NOT NULL DEFAULT NOW(),
                             "updated_at" timestamp,
                             "deleted_at" timestamp
);

CREATE TABLE IF NOT EXISTS "session" (
                           "id" SERIAL PRIMARY KEY,
                           "token" varchar UNIQUE NOT NULL,
                           "userId" int UNIQUE NOT NULL,
                           "created_at" timestamp NOT NULL DEFAULT NOW(),
                           "updated_at" timestamp,
                           "deleted_at" timestamp
);

CREATE TABLE IF NOT EXISTS "favorites" (
                             "id" SERIAL PRIMARY KEY,
                             "articleId" int NOT NULL,
                             "userId" int NOT NULL,
                             "created_at" timestamp NOT NULL DEFAULT NOW(),
                             "updated_at" timestamp,
                             "deleted_at" timestamp
);

CREATE UNIQUE INDEX ON "articleTag" ("tagId", "articleId");

CREATE UNIQUE INDEX ON "followers" ("userId", "followerId");

CREATE UNIQUE INDEX ON "favorites" ("userId", "articleId");

ALTER TABLE "article" ADD CONSTRAINT "article.authorId" FOREIGN KEY ("authorId") REFERENCES "user" ("id") ON DELETE CASCADE;

ALTER TABLE "comment" ADD CONSTRAINT "comment.authorId" FOREIGN KEY ("authorId") REFERENCES "user" ("id") ON DELETE CASCADE;

ALTER TABLE "comment" ADD CONSTRAINT "comment.articleId" FOREIGN KEY ("articleId") REFERENCES "article" ("id") ON DELETE CASCADE;

ALTER TABLE "followers" ADD CONSTRAINT "followers.userId" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE;

ALTER TABLE "followers" ADD CONSTRAINT "followers.followerId" FOREIGN KEY ("followerId") REFERENCES "user" ("id") ON DELETE CASCADE;

ALTER TABLE "session" ADD CONSTRAINT "session.userId" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE;

ALTER TABLE "articleTag" ADD CONSTRAINT "articleTag.articleId" FOREIGN KEY ("articleId") REFERENCES "article" ("id") ON DELETE CASCADE;

ALTER TABLE "articleTag" ADD CONSTRAINT "articleTag.tagId" FOREIGN KEY ("tagId") REFERENCES "tag" ("id") ON DELETE CASCADE;

ALTER TABLE "favorites" ADD CONSTRAINT "favorites.articleId" FOREIGN KEY ("articleId") REFERENCES "article" ("id") ON DELETE CASCADE;

ALTER TABLE "favorites" ADD CONSTRAINT "favorites.tagId" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE;
