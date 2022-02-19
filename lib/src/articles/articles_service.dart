import 'package:dart_shelf_realworld_example_app/src/articles/model/article.dart';
import 'package:dart_shelf_realworld_example_app/src/articles/model/favorite.dart';
import 'package:dart_shelf_realworld_example_app/src/common/exceptions/already_exists_exception.dart';
import 'package:dart_shelf_realworld_example_app/src/common/exceptions/argument_exception.dart';
import 'package:dart_shelf_realworld_example_app/src/common/exceptions/not_found_exception.dart';
import 'package:postgres/postgres.dart';
import 'package:slugify/slugify.dart';

import '../users/users_service.dart';

class ArticlesService {
  static String articlesTable = 'articles';
  static String favoritesTable = 'favorites';

  final PostgreSQLConnection connection;
  final UsersService usersService;

  ArticlesService({required this.connection, required this.usersService});

  Future<Article> createArticle(
      {required String authorId,
      required String title,
      required String description,
      required String body,
      required List<String> tagList}) async {
    _validateTitleOrThrow(title);

    _validateDescriptionOrThrow(description);

    _validateBodyOrThrow(body);

    final author = await usersService.getUserById(authorId);

    if (author == null) {
      throw ArgumentException(
          message: 'User not found', parameterName: 'authorId');
    }

    final slug = _makeSlug(author.username, title);

    await _validateSlugOrThrow(slug);

    final hasDeletedArticleSql =
        'SELECT EXISTS(SELECT 1 FROM $articlesTable WHERE slug = @slug AND deleted_at IS NOT NULL);';

    final hasDeletedArticleResult =
        await connection.query(hasDeletedArticleSql, substitutionValues: {
      'slug': slug,
    });

    var hasDeletedArticle = hasDeletedArticleResult[0][0];

    String sql;
    if (hasDeletedArticle) {
      sql =
          'UPDATE $articlesTable SET deleted_at = NULL, created_at = current_timestamp WHERE slug = @slug RETURNING id, created_at, updated_at, deleted_at';
    } else {
      sql =
          'INSERT INTO $articlesTable(author_id, title, description, body, tag_list, slug) VALUES (@authorId, @title, @description, @body, @tagList, @slug) RETURNING id, created_at, updated_at, deleted_at;';
    }

    final result = await connection.query(sql, substitutionValues: {
      'authorId': author.id,
      'title': title,
      'description': description,
      'body': body,
      'tagList': tagList,
      'slug': slug
    });

    final articleRow = result[0];

    final articleId = articleRow[0];
    final createdAt = articleRow[1];
    final updatedAt = articleRow[2];
    final deletedAt = articleRow[3];

    return Article(
        id: articleId,
        authorId: author.id,
        title: title,
        description: description,
        body: body,
        tagList: tagList,
        slug: slug,
        createdAt: createdAt,
        updatedAt: updatedAt,
        deletedAt: deletedAt);
  }

  Future<Article?> getArticleById(String articleId) async {
    final sql =
        'SELECT author_id, title, description, body, tag_list, slug, created_at, updated_at, deleted_at FROM $articlesTable WHERE id = @articleId AND deleted_at IS NULL;';

    final result = await connection
        .query(sql, substitutionValues: {'articleId': articleId});

    if (result.isEmpty) {
      return null;
    }

    final articleRow = result[0];

    final authorId = articleRow[0];
    final title = articleRow[1];
    final description = articleRow[2];
    final body = articleRow[3];
    final taglist = articleRow[4];
    final slug = articleRow[5];
    final createdAt = articleRow[6];
    final updatedAt = articleRow[7];
    final deletedAt = articleRow[8];

    return Article(
        id: articleId,
        authorId: authorId,
        title: title,
        description: description,
        body: body,
        tagList: taglist,
        slug: slug,
        createdAt: createdAt,
        updatedAt: updatedAt,
        deletedAt: deletedAt);
  }

  Future<Article?> getArticleBySlug(String slug) async {
    final sql =
        'SELECT id FROM $articlesTable WHERE slug = @slug AND deleted_at IS NULL;';

    final result =
        await connection.query(sql, substitutionValues: {'slug': slug});

    if (result.isEmpty) {
      return null;
    }

    final articleId = result[0][0];

    return await getArticleById(articleId);
  }

  Future<List<Favorite>> listFavorites(String articleId) async {
    final sql =
        'SELECT id, user_id, created_at, updated_at, deleted_at FROM $favoritesTable WHERE article_id = @articleId AND deleted_at IS NULL;';

    final result = await connection
        .query(sql, substitutionValues: {'articleId': articleId});

    List<Favorite> favorites = List.empty();

    for (final row in result) {
      final favoriteId = row[0];
      final userId = row[1];
      final createdAt = row[2];
      final updatedAt = row[3];
      final deletedAt = row[4];

      final favorite = Favorite(
          id: favoriteId,
          userId: userId,
          articleId: articleId,
          createdAt: createdAt,
          updatedAt: updatedAt,
          deletedAt: deletedAt);

      favorites.add(favorite);
    }

    return favorites;
  }

  Future<bool> isFavorited(String userId, String articleId) async {
    final favorites = await listFavorites(articleId);

    return favorites.any((f) => f.userId == userId);
  }

  Future<int> getFavoritesCount(String articleId) async {
    final favorites = await listFavorites(articleId);

    return favorites.length;
  }

  Future<Article> updateArticleById(String articleId,
      {String? title,
      String? description,
      String? body,
      List<String>? tagList}) async {
    final article = await getArticleById(articleId);

    if (article == null) {
      throw NotFoundException(message: 'Article does not exist');
    }

    final initialSql = 'UPDATE $articlesTable';

    var sql = initialSql;

    var slug = article.slug;

    if (title != null && title != article.title) {
      _validateTitleOrThrow(title);

      final author = await usersService.getUserById(article.authorId);

      if (author == null) {
        throw StateError('Author not found');
      }

      slug = _makeSlug(author.username, title);

      await _validateSlugOrThrow(slug);

      if (sql == initialSql) {
        sql = sql + ' SET title = @title, slug = @slug';
      } else {
        sql = sql + ', title = @title, slug = @slug';
      }
    }

    if (description != null && description != article.description) {
      _validateDescriptionOrThrow(description);

      if (sql == initialSql) {
        sql = sql + ' SET description = @description';
      } else {
        sql = sql + ', description = @description';
      }
    }

    if (body != null && body != article.body) {
      _validateBodyOrThrow(body);

      if (sql == initialSql) {
        sql = sql + " SET body = @body";
      } else {
        sql = sql + ", body = @body";
      }
    }

    if (tagList != null) {
      if (sql == initialSql) {
        sql = sql + " SET tag_list = @tagList";
      } else {
        sql = sql + ", tag_list = @tagList";
      }
    }

    if (sql != initialSql) {
      sql = sql + ', updated_at = current_timestamp';
      sql = sql + ' WHERE id = @articleId;';

      await connection.query(sql, substitutionValues: {
        'articleId': article.id,
        'title': title,
        'slug': slug,
        'description': description,
        'body': body,
        'tagList': tagList
      });
    }

    final updatedArticle = await getArticleById(article.id);

    if (updatedArticle == null) {
      throw AssertionError(
          "Article cannot be null at this point. ArticleId: ${article.id}");
    }

    return updatedArticle;
  }

  void _validateTitleOrThrow(String title) {
    if (title.trim().isEmpty) {
      throw ArgumentException(
          message: 'title cannot be blank', parameterName: 'title');
    }
  }

  void _validateDescriptionOrThrow(String description) {
    if (description.trim().isEmpty) {
      throw ArgumentException(
          message: 'description cannot be blank', parameterName: 'description');
    }
  }

  void _validateBodyOrThrow(String body) {
    if (body.trim().isEmpty) {
      throw ArgumentException(
          message: 'body cannot be blank', parameterName: 'body');
    }
  }

  Future<void> _validateSlugOrThrow(String slug) async {
    final existingArticle = await getArticleBySlug(slug);

    if (existingArticle != null) {
      throw AlreadyExistsException(message: 'Article already exists');
    }
  }

  String _makeSlug(String username, String title) {
    return slugify(username + ' ' + title);
  }
}
