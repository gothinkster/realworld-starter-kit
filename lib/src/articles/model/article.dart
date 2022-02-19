import 'package:dart_shelf_realworld_example_app/src/common/model/base_entity.dart';

class Article extends BaseEntity {
  final String authorId;
  final String slug;
  final String title;
  final String description;
  final String body;
  final List<String> tagList;

  Article(
      {required String id,
      required this.authorId,
      required this.slug,
      required this.title,
      required this.description,
      required this.body,
      required this.tagList,
      required DateTime createdAt,
      required DateTime updatedAt,
      required DateTime? deletedAt})
      : super(
            id: id,
            createdAt: createdAt,
            updatedAt: updatedAt,
            deletedAt: deletedAt);
}
