<?php

namespace Conduit\Controllers\User;

use Conduit\Transformers\UserTransformer;
use Interop\Container\ContainerInterface;
use League\Fractal\Resource\Item;
use Slim\Http\Request;
use Slim\Http\Response;

class UserController
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

    public function show(Request $request, Response $response)
    {
        if ($user = $this->auth->requestUser($request)) {
            $data = $this->fractal->createData(new Item($user, new UserTransformer()))->toArray();

            return $response->withJson(['user' => $data]);
        };
    }

    public function update(Request $request, Response $response)
    {
        if ($user = $this->auth->requestUser($request)) {
            $requestParams = $request->getParam('user');

            // TODO Image Upload
            $user->update(array_only($requestParams, ['email', 'username', 'password', 'image', 'bio']));

            $data = $this->fractal->createData(new Item($user, new UserTransformer()))->toArray();

            return $response->withJson(['user' => $data]);
        };
    }
}