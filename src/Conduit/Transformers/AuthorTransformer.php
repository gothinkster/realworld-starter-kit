<?php

namespace Conduit\Transformers;

use Conduit\Models\User;
use League\Fractal\TransformerAbstract;

class AuthorTransformer extends TransformerAbstract
{

    public function transform(User $user)
    {
        return [
            'username'  => $user->username,
            'bio'       => $user->bio,
            'image'     => $user->image,
            'following' => $user->isFollowing(),
        ];
    }
}