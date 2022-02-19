import 'dart:convert';

import 'package:dart_shelf_realworld_example_app/src/common/errors/dtos/error_dto.dart';
import 'package:dart_shelf_realworld_example_app/src/users/dtos/user_dto.dart';
import 'package:http/http.dart';
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

  group('Given taglist', () {
    test('Should return 200', () async {
      final title = faker.lorem.sentence();
      final description = faker.lorem
          .sentences(faker.randomGenerator.integer(3, min: 1))
          .join();
      final body = faker.lorem
          .sentences(faker.randomGenerator.integer(20, min: 1))
          .join();
      final tagList =
          faker.lorem.words(faker.randomGenerator.integer(5, min: 1));

      final article = await createArticleAndDecode(
          author: author,
          title: title,
          description: description,
          body: body,
          taglist: tagList);

      expect(article.tagList, tagList);
    });
  });

  group('Given no tagList', () {
    test('Should return 200', () async {
      final title = faker.lorem.sentence();
      final description = faker.lorem
          .sentences(faker.randomGenerator.integer(3, min: 1))
          .join();
      final body = faker.lorem
          .sentences(faker.randomGenerator.integer(20, min: 1))
          .join();

      final article = await createArticleAndDecode(
          author: author, title: title, description: description, body: body);

      expect(article.tagList.isEmpty, true);
    });
  });

  test('Given Article already exists should return 409', () async {
    final existingArticle =
        await createRandomArticleAndDecode(author: author, withTagList: false);

    final description = faker.lorem.sentence();
    final body =
        faker.lorem.sentences(faker.randomGenerator.integer(5, min: 1)).join();

    final response = await createArticle(
        author: author,
        title: existingArticle.title,
        description: description,
        body: body);

    expect(response.statusCode, 409);

    final responseJson = jsonDecode(response.body);

    final errorDto = ErrorDto.fromJson(responseJson);

    expect(errorDto.errors[0], 'Article already exists');
  });

  test('Given no article should return 422', () async {
    final headers = makeAuthorizationHeader(author.token);

    final requestData = {};

    final response = await post(createArticleUri(),
        headers: headers, body: jsonEncode(requestData));

    expect(response.statusCode, 422);

    final responseJson = jsonDecode(response.body);

    final errorDto = ErrorDto.fromJson(responseJson);

    expect(errorDto.errors[0], 'article is required');
  });

  group('title validation', () {
    test('Given no title should return 422', () async {
      final description = faker.lorem
          .sentences(faker.randomGenerator.integer(3, min: 1))
          .join();
      final body = faker.lorem
          .sentences(faker.randomGenerator.integer(20, min: 1))
          .join();

      final headers = makeAuthorizationHeader(author.token);

      final requestData = {
        'article': {
          'description': description,
          'body': body,
        }
      };

      final response = await post(createArticleUri(),
          headers: headers, body: jsonEncode(requestData));

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'title is required');
    });

    test('Given title is empty should return 422', () async {
      final title = '';
      final description = faker.lorem
          .sentences(faker.randomGenerator.integer(3, min: 1))
          .join();
      final body = faker.lorem
          .sentences(faker.randomGenerator.integer(20, min: 1))
          .join();

      final response = await createArticle(
          author: author, title: title, description: description, body: body);

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'title cannot be blank');
    });

    test('Given title is whitespace should return 422', () async {
      final title = ' ';
      final description = faker.lorem
          .sentences(faker.randomGenerator.integer(3, min: 1))
          .join();
      final body = faker.lorem
          .sentences(faker.randomGenerator.integer(20, min: 1))
          .join();

      final response = await createArticle(
          author: author, title: title, description: description, body: body);

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'title cannot be blank');
    });
  });

  group('description validation', () {
    test('Given no description should return 422', () async {
      final title = faker.lorem.sentence();
      final body = faker.lorem
          .sentences(faker.randomGenerator.integer(20, min: 1))
          .join();

      final headers = makeAuthorizationHeader(author.token);

      final requestData = {
        'article': {
          'title': title,
          'body': body,
        }
      };

      final response = await post(createArticleUri(),
          headers: headers, body: jsonEncode(requestData));

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'description is required');
    });

    test('Given description is empty should return 422', () async {
      final title = faker.lorem.sentence();
      final description = '';
      final body = faker.lorem
          .sentences(faker.randomGenerator.integer(20, min: 1))
          .join();

      final response = await createArticle(
          author: author, title: title, description: description, body: body);

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'description cannot be blank');
    });

    test('Given description is whitespace should return 422', () async {
      final title = faker.lorem.sentence();
      final description = ' ';
      final body = faker.lorem
          .sentences(faker.randomGenerator.integer(20, min: 1))
          .join();

      final response = await createArticle(
          author: author, title: title, description: description, body: body);

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'description cannot be blank');
    });
  });

  group('body validation', () {
    test('Given no body should return 422', () async {
      final title = faker.lorem.sentence();
      final description = faker.lorem
          .sentences(faker.randomGenerator.integer(5, min: 1))
          .join();

      final headers = makeAuthorizationHeader(author.token);

      final requestData = {
        'article': {
          'title': title,
          'description': description,
        }
      };

      final response = await post(createArticleUri(),
          headers: headers, body: jsonEncode(requestData));

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'body is required');
    });

    test('Given body is empty should return 422', () async {
      final title = faker.lorem.sentence();
      final description = faker.lorem
          .sentences(faker.randomGenerator.integer(3, min: 1))
          .join();
      final body = '';

      final response = await createArticle(
          author: author, title: title, description: description, body: body);

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'body cannot be blank');
    });

    test('Given body is whitespace should return 422', () async {
      final title = faker.lorem.sentence();
      final description = faker.lorem
          .sentences(faker.randomGenerator.integer(3, min: 1))
          .join();
      final body = ' ';

      final response = await createArticle(
          author: author, title: title, description: description, body: body);

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'body cannot be blank');
    });
  });

  group('authorization', () {
    test('Given no authorization header should return 401', () async {
      final response = await post(createArticleUri());

      expect(response.statusCode, 401);
    });

    test('Given invalid authorization header should return 401', () async {
      final headers = {'Authorization': 'invalid'};
      final response = await post(createArticleUri(), headers: headers);

      expect(response.statusCode, 401);
    });

    test('Given no token should return 401', () async {
      final headers = {'Authorization': 'Token '};
      final response = await post(createArticleUri(), headers: headers);

      expect(response.statusCode, 401);
    });

    test('Given user is not found should return 401', () async {
      final email = faker.internet.email();
      final token = makeToken(email);

      final headers = {'Authorization': 'Token $token'};

      final response = await post(createArticleUri(), headers: headers);

      expect(response.statusCode, 401);
    });
  });
}
