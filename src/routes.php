<?php

use Slim\Http\Request;
use Slim\Http\Response;


// Api Routes
$app->group('/api', function () {

    // Articles Routes
    $this->get('/articles', function (Request $request, Response $response, array $args) {
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
});


// Routes

$app->get('/[{name}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
