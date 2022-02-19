import 'dart:convert';

import 'package:dart_shelf_realworld_example_app/src/articles/articles_service.dart';
import 'package:dart_shelf_realworld_example_app/src/articles/dtos/article_dto.dart';
import 'package:dart_shelf_realworld_example_app/src/articles/model/article.dart';
import 'package:dart_shelf_realworld_example_app/src/common/errors/dtos/error_dto.dart';
import 'package:dart_shelf_realworld_example_app/src/common/exceptions/already_exists_exception.dart';
import 'package:dart_shelf_realworld_example_app/src/common/exceptions/argument_exception.dart';
import 'package:dart_shelf_realworld_example_app/src/profiles/dtos/profile_dto.dart';
import 'package:dart_shelf_realworld_example_app/src/profiles/profiles_service.dart';
import 'package:dart_shelf_realworld_example_app/src/users/users_service.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

import '../common/middleware/auth.dart';
import '../users/model/user.dart';

class ArticlesRouter {
  final ArticlesService articlesService;
  final UsersService usersService;
  final ProfilesService profilesService;
  final AuthProvider authProvider;

  ArticlesRouter(
      {required this.articlesService,
      required this.usersService,
      required this.profilesService,
      required this.authProvider});

  Future<Response> _createArticle(Request request) async {
    final user = request.context['user'] as User;

    final requestBody = await request.readAsString();

    final requestData = json.decode(requestBody);

    final articleData = requestData['article'];

    if (articleData == null) {
      return Response(422,
          body: jsonEncode(ErrorDto(errors: ['article is required'])));
    }

    final title = articleData['title'];
    final description = articleData['description'];
    final body = articleData['body'];
    final tagListData = articleData['tagList'];

    if (title == null) {
      return Response(422,
          body: jsonEncode(ErrorDto(errors: ['title is required'])));
    }

    if (description == null) {
      return Response(422,
          body: jsonEncode(ErrorDto(errors: ['description is required'])));
    }

    if (body == null) {
      return Response(422,
          body: jsonEncode(ErrorDto(errors: ['body is required'])));
    }

    List<String> tagList =
        tagListData == null ? List.empty() : List.from(tagListData);

    Article article;

    try {
      article = await articlesService.createArticle(
          authorId: user.id,
          title: title,
          description: description,
          body: body,
          tagList: tagList);
    } on ArgumentException catch (e) {
      return Response(422, body: jsonEncode(ErrorDto(errors: [e.message])));
    } on AlreadyExistsException catch (e) {
      return Response(409, body: jsonEncode(ErrorDto(errors: [e.message])));
    }

    final favoritesCount = await articlesService.getFavoritesCount(article.id);

    final author = ProfileDto(
        username: user.username,
        bio: user.bio,
        image: user.image,
        following: false);

    final articleDto = ArticleDto(
        slug: article.slug,
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
        favorited: false,
        favoritesCount: favoritesCount,
        author: author);

    return Response(201, body: jsonEncode(articleDto));
  }

  Future<Response> _getArticle(Request request) async {
    final slug = request.params['slug'];

    if (slug == null) {
      throw UnsupportedError('slug must be in the request params');
    }

    final article = await articlesService.getArticleBySlug(slug);

    if (article == null) {
      return Response.notFound(
          jsonEncode(ErrorDto(errors: ['Article not found'])));
    }

    final author = await usersService.getUserById(article.authorId);

    if (author == null) {
      throw StateError('Author not found');
    }

    var isArticleFavorited = false;
    var isFollowingAuthor = false;

    final contextUser = request.context['user'];
    if (contextUser != null) {
      final user = contextUser as User;
      isArticleFavorited =
          await articlesService.isFavorited(user.id, article.id);
      isFollowingAuthor = await profilesService.isFollowing(user.id, author.id);
    }

    final favoritesCount = await articlesService.getFavoritesCount(article.id);

    final authorProfile = ProfileDto(
        username: author.username,
        bio: author.bio,
        image: author.image,
        following: isFollowingAuthor);

    final articleDto = ArticleDto(
        slug: article.slug,
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
        favorited: isArticleFavorited,
        favoritesCount: favoritesCount,
        author: authorProfile);

    return Response.ok(jsonEncode(articleDto));
  }

  Future<Response> _updateArticle(Request request) async {
    final user = request.context['user'] as User;

    final slug = request.params['slug'];

    if (slug == null) {
      throw UnsupportedError('slug must be in the request params');
    }

    final requestBody = await request.readAsString();

    final requestData = json.decode(requestBody);

    final articleData = requestData['article'];

    if (articleData == null) {
      return Response(422,
          body: jsonEncode(ErrorDto(errors: ['article is required'])));
    }

    final title = articleData['title'];
    final description = articleData['description'];
    final body = articleData['body'];
    final tagListData = articleData['tagList'];

    List<String>? tagList = tagListData == null ? null : List.from(tagListData);

    final article = await articlesService.getArticleBySlug(slug);

    if (article == null) {
      return Response.notFound(
          jsonEncode(ErrorDto(errors: ['Article not found'])));
    }

    Article updatedArticle;

    try {
      updatedArticle = await articlesService.updateArticleById(article.id,
          title: title, description: description, body: body, tagList: tagList);
    } on ArgumentException catch (e) {
      return Response(422, body: jsonEncode(ErrorDto(errors: [e.message])));
    }

    final favoritesCount = await articlesService.getFavoritesCount(article.id);

    final author = ProfileDto(
        username: user.username,
        bio: user.bio,
        image: user.image,
        following: false);

    final articleDto = ArticleDto(
        slug: updatedArticle.slug,
        title: updatedArticle.title,
        description: updatedArticle.description,
        body: updatedArticle.body,
        tagList: updatedArticle.tagList,
        createdAt: updatedArticle.createdAt,
        updatedAt: updatedArticle.updatedAt,
        favorited: false,
        favoritesCount: favoritesCount,
        author: author);

    return Response.ok(jsonEncode(articleDto));
  }

  Handler get router {
    final router = Router();

    router.post(
        '/articles',
        Pipeline()
            .addMiddleware(authProvider.requireAuth())
            .addHandler(_createArticle));

    router.get(
        '/articles/<slug>',
        Pipeline()
            .addMiddleware(authProvider.optionalAuth())
            .addHandler(_getArticle));

    router.put(
        '/articles/<slug>',
        Pipeline()
            .addMiddleware(authProvider.requireAuth())
            .addHandler(_updateArticle));

    return router;
  }
}
