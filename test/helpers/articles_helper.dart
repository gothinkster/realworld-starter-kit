import 'dart:convert';

import 'package:dart_shelf_realworld_example_app/src/articles/dtos/article_dto.dart';
import 'package:dart_shelf_realworld_example_app/src/users/dtos/user_dto.dart';
import 'package:http/http.dart';
import 'package:slugify/slugify.dart';
import 'package:test/expect.dart';

import '../test_fixtures.dart';
import 'auth_helper.dart';
import 'profiles_helper.dart';

Uri createArticleUri() {
  return Uri.parse(host + '/articles');
}

Future<Response> createArticle(
    {required UserDto author,
    required String title,
    required String description,
    required String body,
    List<String>? taglist}) async {
  final headers = makeAuthorizationHeader(author.token);

  final requestData = {
    'article': {
      'title': title,
      'description': description,
      'body': body,
      'tagList': taglist
    }
  };

  return await post(createArticleUri(),
      headers: headers, body: jsonEncode(requestData));
}

Future<ArticleDto> createArticleAndDecode(
    {required UserDto author,
    required String title,
    required String description,
    required String body,
    List<String>? taglist}) async {
  final response = await createArticle(
      author: author,
      title: title,
      description: description,
      body: body,
      taglist: taglist);

  expect(response.statusCode, 201);

  final responseJson = json.decode(response.body);

  final article = ArticleDto.fromJson(responseJson);

  final authorProfile = await getProfileAndDecode(username: author.username);

  final now = DateTime.now();

  expect(article.title, title);
  expect(article.slug, slugify(author.username + ' ' + article.title));
  expect(article.description, description);
  expect(article.body, body);
  expect(now.difference(article.createdAt).inSeconds < 1, true);
  expect(article.updatedAt.isAtSameMomentAs(article.createdAt), true);
  expect(article.author.toJson(), authorProfile.toJson());

  return article;
}

Future<ArticleDto> createRandomArticleAndDecode(
    {required UserDto author, required bool withTagList}) async {
  final title = faker.lorem.sentence();
  final description =
      faker.lorem.sentences(faker.randomGenerator.integer(3, min: 1)).join();
  final body =
      faker.lorem.sentences(faker.randomGenerator.integer(20, min: 1)).join();

  List<String>? tagList;

  if (withTagList) {
    tagList = faker.lorem.words(faker.randomGenerator.integer(5, min: 1));
  }

  return await createArticleAndDecode(
      author: author,
      title: title,
      description: description,
      body: body,
      taglist: tagList);
}

Uri getArticleUri(String slug) {
  return Uri.parse(host + '/articles/$slug');
}

Future<Response> getArticle({required String slug, String? token}) async {
  Map<String, String> headers = {};

  if (token != null) {
    headers = makeAuthorizationHeader(token);
  }

  return await get(getArticleUri(slug), headers: headers);
}

Future<ArticleDto> getArticleAndDecode(
    {required String slug, String? token}) async {
  final response = await getArticle(slug: slug, token: token);

  expect(response.statusCode, 200);

  final responseJson = jsonDecode(response.body);

  return ArticleDto.fromJson(responseJson);
}

Uri updateArticleUri(String slug) {
  return Uri.parse(host + '/articles/$slug');
}

Future<Response> updateArticle(
    {required String slug,
    required String token,
    String? title,
    String? description,
    String? body}) async {
  final requestData = {'article': {}};

  if (title != null) {
    requestData['article']?['title'] = title;
  }

  if (description != null) {
    requestData['article']?['description'] = description;
  }

  if (body != null) {
    requestData['article']?['body'] = body;
  }

  if (title != null) {
    requestData['article']?['title'] = title;
  }

  final headers = makeAuthorizationHeader(token);

  return await put(updateArticleUri(slug),
      headers: headers, body: jsonEncode(requestData));
}

Future<ArticleDto> updateArticleAndDecode(
    {required String token,
    required String slug,
    String? title,
    String? description,
    String? body}) async {
  final response = await updateArticle(
      token: token,
      slug: slug,
      title: title,
      description: description,
      body: body);

  expect(response.statusCode, 200);

  final responseJson = json.decode(response.body);

  return ArticleDto.fromJson(responseJson);
}
