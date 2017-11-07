<?php

namespace Conduit\Controllers\Auth;

use Conduit\Models\User;
use Interop\Container\ContainerInterface;
use Slim\Http\Request;
use Slim\Http\Response;
use Respect\Validation\Validator as v;

class RegisterController
{

    /**
     * @var \Conduit\Validation\Validator
     */
    protected $validator;
    protected $db;

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
        $this->validator = $container->get('validator');
        $this->db = $container->get('db');
    }

    public function register(Request $request, Response $response, array $args)
    {
        $validation = $this->validateRegisterRequest($userParams = $request->getParam('user'));

        if ($validation->failed()) {
            return $response->withJson(['errors' => $validation->getErrors()], 422);
        }

        $user = new User($userParams);
        $user->token = $this->auth->generateToken($user->username);
        $user->save();

        return $response->withJson(
            [
                'user' => $user->toArray(),
            ]);
    }

    /**
     * @param array
     *
     * @return \Conduit\Validation\Validator
     */
    protected function validateRegisterRequest($values)
    {
        return $this->validator->validateArray($values,
            [
                'email'    => v::noWhitespace()->notEmpty()->email()->existsInTable($this->db->table('users'), 'email'),
                'username' => v::noWhitespace()->notEmpty()->alpha()->existsInTable($this->db->table('users'),
                    'username'),
                'password' => v::noWhitespace()->notEmpty(),
            ]);
    }
}