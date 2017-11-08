<?php

use Conduit\Controllers\Article\ArticleController;
use Conduit\Controllers\Article\CommentController;
use Conduit\Controllers\Article\FavoriteController;
use Conduit\Controllers\Auth\LoginController;
use Conduit\Controllers\Auth\RegisterController;
use Conduit\Controllers\User\ProfileController;
use Conduit\Controllers\User\UserController;
use Conduit\Middleware\OptionalAuth;
use Slim\Http\Request;
use Slim\Http\Response;


// Api Routes
$app->group('/api',
    function () {
        $jwtMiddleware = $this->getContainer()->get('jwt');
        $optionalAuth = $this->getContainer()->get('optionalAuth');
        /** @var \Slim\App $this */

        // Auth Routes
        $this->post('/users', RegisterController::class . ':register')->setName('auth.register');
        $this->post('/users/login', LoginController::class . ':login')->setName('auth.login');

        // User Routes
        $this->get('/user', UserController::class . ':show')->add($jwtMiddleware)->setName('user.show');
        $this->put('/user', UserController::class . ':update')->add($jwtMiddleware)->setName('user.update');

        // Profile Routes
        $this->get('/profiles/{username}', ProfileController::class . ':show')
            ->add($optionalAuth)
            ->setName('profile.show');
        $this->post('/profiles/{username}/follow', ProfileController::class . ':follow')
            ->add($jwtMiddleware)
            ->setName('profile.follow');
        $this->delete('/profiles/{username}/follow', ProfileController::class . ':unfollow')
            ->add($jwtMiddleware)
            ->setName('profile.unfollow');


        // Articles Routes
        $this->get('/articles/{slug}', ArticleController::class . ':show')->add($optionalAuth)->setName('article.show');
        $this->put('/articles/{slug}',
            ArticleController::class . ':update')->add($jwtMiddleware)->setName('article.update');
        $this->delete('/articles/{slug}',
            ArticleController::class . ':destroy')->add($jwtMiddleware)->setName('article.destroy');
        $this->post('/articles', ArticleController::class . ':store')->add($jwtMiddleware)->setName('article.store');

        $this->get('/articles',
            function (Request $request, Response $response, array $args) {
                $articles = [
                    [
                        'title'          => 'Roba',
                        'slug'           => 'roba-h7xlj2',
                        'body'           => 'Roba just had coffee',
                        'createdAt'      => '2017-11-06T15:32:04.357Z',
                        'updatedAt'      => '2017-11-06T15:32:04.357Z',
                        'tagList'        => [],
                        'description'    => 'Just about me',
                        'author'         => [
                            'username'  => 'roba',
                            'bio'       => null,
                            'image'     => 'https://static.productionready.io/images/smiley-cyrus.jpg',
                            'following' => false,
                        ],
                        'favorited'      => false,
                        'favoritesCount' => 2,
                    ],
                ];

                return $response->withJson(
                    [
                        'articles'      => $articles,
                        'articlesCount' => 1,
                    ],
                    200);
            });

        // Comments
        $this->get('/articles/{slug}/comments',
            CommentController::class . ':index')
            ->add($optionalAuth)
            ->setName('comment.index');
        $this->post('/articles/{slug}/comments',
            CommentController::class . ':store')
            ->add($jwtMiddleware)
            ->setName('comment.store');
        $this->delete('/articles/{slug}/comments/{id}',
            CommentController::class . ':destroy')
            ->add($jwtMiddleware)
            ->setName('comment.destroy');

        // Favorite Article Routes
        $this->post('/articles/{slug}/favorite',
            FavoriteController::class . ':store')
            ->add($jwtMiddleware)
            ->setName('favorite.store');
        $this->delete('/articles/{slug}/favorite',
            FavoriteController::class . ':destroy')
            ->add($jwtMiddleware)
            ->setName('favorite.destroy');
    });


// Routes

$app->get('/[{name}]',
    function (Request $request, Response $response, array $args) {
        // Sample log message
        $this->logger->info("Slim-Skeleton '/' route");

        // Render index view
        return $this->renderer->render($response, 'index.phtml', $args);
    });
