<?php

namespace Conduit\Controllers\User;

use Conduit\Models\User;
use Conduit\Transformers\ProfileTransformer;
use Conduit\Transformers\UserTransformer;
use Interop\Container\ContainerInterface;
use League\Fractal\Resource\Item;
use Slim\Http\Request;
use Slim\Http\Response;

class ProfileController
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
        $user = User::where('username', $args['username'])->firstOrFail();
        $requestUser = $this->auth->requestUser($request);
        $followingStatus = false;

        if ($requestUser) {
            $followingStatus = $requestUser->isFollowing($user->id);
        }

        return $response->withJson(
            [
                'profile' => [
                    'username'  => $user->username,
                    'bio'       => $user->bio,
                    'image'     => $user->image,
                    'following' => $followingStatus,
                ],
            ]
        );
    }

    public function follow(Request $request, Response $response, array $args)
    {
        $requestUser = $this->auth->requestUser($request);
        $user = User::query()->where('username', $args['username'])->firstOrFail();

        $requestUser->follow($user->id);

        return $response->withJson(
            [
                'profile' => [
                    'username'  => $user->username,
                    'bio'       => $user->bio,
                    'image'     => $user->image,
                    'following' => $user->isFollowedBy($requestUser),
                ],
            ]
        );
    }

    public function unfollow(Request $request, Response $response, array $args)
    {
        $requestUser = $this->auth->requestUser($request);
        $user = User::query()->where('username', $args['username'])->firstOrFail();

        $requestUser->unFollow($user->id);

        return $response->withJson(
            [
                'profile' => [
                    'username'  => $user->username,
                    'bio'       => $user->bio,
                    'image'     => $user->image,
                    'following' => $requestUser->isFollowing($user->id),
                ],
            ]
        );
    }

}