<?php

namespace Conduit\Controllers\Auth;

use Conduit\Models\User;
use Slim\Http\Request;
use Slim\Http\Response;

class RegisterController
{

    public function register(Request $request, Response $response, array $args)
    {
        $user = new User($request->getParams()['user']);
        $user->token = 'some token';
        $user->save();

        return $response->withJson(
            [
                'user' => $user->toArray(),
            ]);
    }
}