<?php

namespace Conduit\Controllers\Article;

use Conduit\Models\Article;
use Slim\Http\Request;
use Slim\Http\Response;

class ArticleController
{

    public function show(Request $request, Response $response, array $args)
    {
        $article = Article::query()->where('slug', $args['slug'])->firstOrFail();

        return $response->withJson(['article' => $article->toArray()]);
    }
}