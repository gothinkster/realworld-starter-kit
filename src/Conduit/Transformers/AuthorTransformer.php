<?php

namespace Conduit\Transformers;

use Conduit\Models\User;
use League\Fractal\TransformerAbstract;

class AuthorTransformer extends TransformerAbstract
{

    /**
     * @var integer|null
     */
    protected $requestUserId;

    /**
     * AuthorTransformer constructor.
     *
     * @param int $requestUserId
     */
    public function __construct($requestUserId = null)
    {
        $this->requestUserId = $requestUserId;
    }

    public function transform(User $user)
    {
        return [
            'username'  => $user->username,
            'bio'       => $user->bio,
            'image'     => $user->image,
            'following' => $user->isFollowedBy($this->requestUserId),
        ];
    }
}