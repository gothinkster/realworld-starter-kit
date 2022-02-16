abstract class BaseEntity {
  final String id;
  final DateTime createdAt;
  final DateTime updatedAt;

  BaseEntity(
      {required this.id, required this.createdAt, required this.updatedAt});
}
