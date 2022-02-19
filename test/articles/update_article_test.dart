import 'dart:convert';

import 'package:dart_shelf_realworld_example_app/src/articles/dtos/article_dto.dart';
import 'package:dart_shelf_realworld_example_app/src/common/errors/dtos/error_dto.dart';
import 'package:dart_shelf_realworld_example_app/src/users/dtos/user_dto.dart';
import 'package:http/http.dart';
import 'package:slugify/slugify.dart';
import 'package:test/test.dart';

import '../helpers/articles_helper.dart';
import '../helpers/auth_helper.dart';
import '../helpers/users_helper.dart';
import '../test_fixtures.dart';

void main() {
  late UserDto author;

  setUp(() async {
    author = (await registerRandomUser()).user;
  });

  group('Given title', () {
    test('Should also update slug and return 200', () async {
      final article = await createRandomArticleAndDecode(
          author: author, withTagList: false);

      final title = faker.lorem.sentence();

      final updatedArticle = await updateArticleAndDecode(
          token: author.token, slug: article.slug, title: title);

      final now = DateTime.now();

      expect(updatedArticle.title, title);
      expect(updatedArticle.slug, slugify(author.username + ' ' + title));
      expect(now.difference(updatedArticle.updatedAt).inSeconds < 1, true);
      expect(
          updatedArticle.createdAt.isAtSameMomentAs(updatedArticle.updatedAt),
          false);

      expect(updatedArticle.description, article.description);
      expect(updatedArticle.body, article.body);
      expect(updatedArticle.createdAt, article.createdAt);
      expect(updatedArticle.tagList, article.tagList);
      expect(updatedArticle.author.toJson(), article.author.toJson());
    });

    test('Given title is empty should return 422', () async {
      final article = await createRandomArticleAndDecode(
          author: author, withTagList: false);

      final uri = Uri.parse(host + '/articles/${article.slug}');

      final title = '';

      final requestData = {
        'article': {'title': title}
      };

      final headers = makeAuthorizationHeader(author.token);

      final response =
          await put(uri, headers: headers, body: jsonEncode(requestData));

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'title cannot be blank');
    });

    test('Given title is whitespace should return 422', () async {
      final article = await createRandomArticleAndDecode(
          author: author, withTagList: false);

      final uri = Uri.parse(host + '/articles/${article.slug}');

      final title = ' ';

      final requestData = {
        'article': {'title': title}
      };

      final headers = makeAuthorizationHeader(author.token);

      final response =
          await put(uri, headers: headers, body: jsonEncode(requestData));

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'title cannot be blank');
    });
  });

  group('Given description', () {
    test('Should return 200', () async {
      final article = await createRandomArticleAndDecode(
          author: author, withTagList: false);

      final description = faker.lorem
          .sentences(faker.randomGenerator.integer(10, min: 1))
          .join();

      final updatedArticle = await updateArticleAndDecode(
          token: author.token, slug: article.slug, description: description);

      final now = DateTime.now();

      expect(updatedArticle.description, description);
      expect(now.difference(updatedArticle.updatedAt).inSeconds < 1, true);
      expect(
          updatedArticle.createdAt.isAtSameMomentAs(updatedArticle.updatedAt),
          false);

      expect(updatedArticle.title, article.title);
      expect(updatedArticle.slug, article.slug);
      expect(updatedArticle.body, article.body);
      expect(updatedArticle.createdAt, article.createdAt);
      expect(updatedArticle.tagList, article.tagList);
      expect(updatedArticle.author.toJson(), article.author.toJson());
    });

    test('Given description is empty should return 422', () async {
      final article = await createRandomArticleAndDecode(
          author: author, withTagList: false);

      final uri = Uri.parse(host + '/articles/${article.slug}');

      final description = '';

      final requestData = {
        'article': {'description': description}
      };

      final headers = makeAuthorizationHeader(author.token);

      final response =
          await put(uri, headers: headers, body: jsonEncode(requestData));

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'description cannot be blank');
    });

    test('Given description is whitespace should return 422', () async {
      final article = await createRandomArticleAndDecode(
          author: author, withTagList: false);

      final uri = Uri.parse(host + '/articles/${article.slug}');

      final description = ' ';

      final requestData = {
        'article': {'description': description}
      };

      final headers = makeAuthorizationHeader(author.token);

      final response =
          await put(uri, headers: headers, body: jsonEncode(requestData));

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'description cannot be blank');
    });
  });

  group('Given body', () {
    test('Should return 200', () async {
      final article = await createRandomArticleAndDecode(
          author: author, withTagList: false);

      final body = faker.lorem
          .sentences(faker.randomGenerator.integer(10, min: 1))
          .join();

      final updatedArticle = await updateArticleAndDecode(
          token: author.token, slug: article.slug, body: body);

      final now = DateTime.now();

      expect(updatedArticle.body, body);
      expect(now.difference(updatedArticle.updatedAt).inSeconds < 1, true);
      expect(
          updatedArticle.createdAt.isAtSameMomentAs(updatedArticle.updatedAt),
          false);

      expect(updatedArticle.title, article.title);
      expect(updatedArticle.slug, article.slug);
      expect(updatedArticle.description, article.description);
      expect(updatedArticle.createdAt, article.createdAt);
      expect(updatedArticle.tagList, article.tagList);
      expect(updatedArticle.author.toJson(), article.author.toJson());
    });

    test('Given body is empty should return 422', () async {
      final article = await createRandomArticleAndDecode(
          author: author, withTagList: false);

      final uri = Uri.parse(host + '/articles/${article.slug}');

      final body = '';

      final requestData = {
        'article': {'body': body}
      };

      final headers = makeAuthorizationHeader(author.token);

      final response =
          await put(uri, headers: headers, body: jsonEncode(requestData));

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'body cannot be blank');
    });

    test('Given title is whitespace should return 422', () async {
      final article = await createRandomArticleAndDecode(
          author: author, withTagList: false);

      final uri = Uri.parse(host + '/articles/${article.slug}');

      final body = ' ';

      final requestData = {
        'article': {'body': body}
      };

      final headers = makeAuthorizationHeader(author.token);

      final response =
          await put(uri, headers: headers, body: jsonEncode(requestData));

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'body cannot be blank');
    });
  });

  group('authorization', () {
    late ArticleDto article;

    setUp(() async {
      article = await createRandomArticleAndDecode(
          author: author, withTagList: false);
    });

    test('Given no authorization header should return 401', () async {
      final response = await put(updateArticleUri(article.slug));

      expect(response.statusCode, 401);
    });

    test('Given invalid authorization header should return 401', () async {
      final headers = {'Authorization': 'invalid'};
      final response =
          await put(updateArticleUri(article.slug), headers: headers);

      expect(response.statusCode, 401);
    });

    test('Given no token should return 401', () async {
      final headers = {'Authorization': 'Token '};
      final response =
          await put(updateArticleUri(article.slug), headers: headers);

      expect(response.statusCode, 401);
    });

    test('Given user is not found should return 401', () async {
      final email = faker.internet.email();
      final token = makeToken(email);

      final headers = {'Authorization': 'Token $token'};

      final response =
          await put(updateArticleUri(article.slug), headers: headers);

      expect(response.statusCode, 401);
    });
  });
}
