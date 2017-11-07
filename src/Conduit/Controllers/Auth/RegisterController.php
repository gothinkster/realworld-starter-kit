<?php

namespace Conduit\Controllers\Auth;

use Conduit\Models\User;
use Interop\Container\ContainerInterface;
use Slim\Http\Request;
use Slim\Http\Response;

class RegisterController
{

    /**
     * @var \Conduit\Services\Auth\Auth
     */
    private $auth;

    /**
     * RegisterController constructor.
     *
     * @param \Interop\Container\ContainerInterface $container
     */
    public function __construct(ContainerInterface $container)
    {
        $this->auth = $container->get('auth');
    }

    public function register(Request $request, Response $response, array $args)
    {
        $user = new User($request->getParams()['user']);
        $user->token = $this->auth->generateToken($user->username);
        $user->save();

        return $response->withJson(
            [
                'user' => $user->toArray(),
            ]);
    }
}