import 'dart:convert';

import 'package:dart_shelf_realworld_example_app/src/common/errors/dtos/error_dto.dart';
import 'package:dart_shelf_realworld_example_app/src/users/dtos/user_dto.dart';
import 'package:slugify/slugify.dart';
import 'package:test/test.dart';

import '../helpers/articles_helper.dart';
import '../helpers/profiles_helper.dart';
import '../helpers/users_helper.dart';
import '../test_fixtures.dart';

void main() {
  late UserDto author;

  setUp(() async {
    author = (await registerRandomUserAndUpdateBioAndImage()).user;
  });

  group('Given caller not authenticated', () {
    test('Should return 200', () async {
      final createdArticle = await createRandomArticleAndDecode(
          author: author, withTagList: false);

      final article = await getArticleAndDecode(slug: createdArticle.slug);

      expect(article.favorited, false);
      expect(article.author.following, false);
      expect(article.toJson(), createdArticle.toJson());
    });
  });

  group('Given caller authenticated', () {
    test('Given caller follows the author should return 200', () async {
      final caller = await registerRandomUser();

      await followUserAndDecode(
          followeeUsername: author.username, followerToken: caller.user.token);

      final createdArticle = await createRandomArticleAndDecode(
          author: author, withTagList: false);

      final article = await getArticleAndDecode(
          slug: createdArticle.slug, token: caller.user.token);

      expect(article.author.following, true);
      expect(article.slug, createdArticle.slug);
    });

    test('Given caller does not follow the author should return 200', () async {
      final caller = await registerRandomUser();

      final createdArticle = await createRandomArticleAndDecode(
          author: author, withTagList: false);

      final article = await getArticleAndDecode(
          slug: createdArticle.slug, token: caller.user.token);

      expect(article.author.following, false);
      expect(article.toJson(), createdArticle.toJson());
    });
  });

  test('Given article does not exist should return 404', () async {
    final slug = slugify(faker.lorem.sentence());

    final response = await getArticle(slug: slug);

    expect(response.statusCode, 404);

    final responseJson = jsonDecode(response.body);

    final error = ErrorDto.fromJson(responseJson);

    expect(error.errors[0], 'Article not found');
  });
}
