<?php

namespace Conduit\Controllers\Article;

use Conduit\Models\Article;
use Conduit\Transformers\ArticleTransformer;
use Interop\Container\ContainerInterface;
use League\Fractal\Resource\Item;
use Slim\Http\Request;
use Slim\Http\Response;

class ArticleController
{


    /** @var \Conduit\Services\Auth\Auth */
    protected $auth;
    /** @var \League\Fractal\Manager */
    protected $fractal;

    /**
     * UserController constructor.
     *
     * @param \Interop\Container\ContainerInterface $container
     *
     * @internal param $auth
     */
    public function __construct(ContainerInterface $container)
    {
        $this->auth = $container->get('auth');
        $this->fractal = $container->get('fractal');
    }


    public function show(Request $request, Response $response, array $args)
    {
        $article = Article::query()->where('slug', $args['slug'])->firstOrFail();

        $data = $this->fractal->createData(new Item($article, new ArticleTransformer()))->toArray();

        return $response->withJson(['article' => $data]);
    }
}