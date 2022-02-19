import 'package:dart_shelf_realworld_example_app/src/profiles/dtos/profile_dto.dart';

class ArticleDto {
  final String slug;
  final String title;
  final String description;
  final String body;
  final List<String> tagList;
  final DateTime createdAt;
  final DateTime updatedAt;
  final bool favorited;
  final int favoritesCount;
  final ProfileDto author;

  ArticleDto(
      {required this.slug,
      required this.title,
      required this.description,
      required this.body,
      required this.tagList,
      required this.createdAt,
      required this.updatedAt,
      required this.favorited,
      required this.favoritesCount,
      required this.author});

  ArticleDto.fromJson(Map<String, dynamic> json)
      : slug = json['article']['slug'],
        title = json['article']['title'],
        description = json['article']['description'],
        body = json['article']['body'],
        tagList = List<String>.from(json['article']['tagList']),
        createdAt = DateTime.parse(json['article']['createdAt']),
        updatedAt = DateTime.parse(json['article']['updatedAt']),
        favorited = json['article']['favorited'],
        favoritesCount = json['article']['favoritesCount'],
        author = ProfileDto.fromJson(json['article']['author']);

  Map<String, dynamic> toJson() => {
        'article': {
          'slug': slug,
          'title': title,
          'description': description,
          'body': body,
          'tagList': tagList,
          'createdAt': createdAt.toIso8601String(),
          'updatedAt': updatedAt.toIso8601String(),
          'favorited': favorited,
          'favoritesCount': favoritesCount,
          'author': author.toJson()
        }
      };
}
