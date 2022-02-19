import 'package:dart_shelf_realworld_example_app/src/articles/articles_router.dart';
import 'package:dart_shelf_realworld_example_app/src/profiles/profiles_router.dart';
import 'package:dart_shelf_realworld_example_app/src/users/users_router.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

class ApiRouter {
  final UsersRouter usersRouter;
  final ProfilesRouter profilesRouter;
  final ArticlesRouter articlesRouter;

  ApiRouter(
      {required this.usersRouter,
      required this.profilesRouter,
      required this.articlesRouter});

  Handler get router {
    final router = Router();
    final prefix = '/api';

    router.mount(prefix, usersRouter.router);
    router.mount(prefix, profilesRouter.router);
    router.mount(prefix, articlesRouter.router);

    return router;
  }
}
