<?php

namespace Conduit\Transformers;

use Conduit\Models\User;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{

    public function transform(User $user)
    {
        return [
            'id'        => (int)$user->id,
            'email'     => $user->email,
            'createdAt' => isset($user->created_at) ? $user->created_at->toIso8601String() : $user->created_at,
            'updatedAt' => isset($user->update_at) ? $user->update_at->toIso8601String() : $user->update_at,
            'username'  => $user->username,
            'bio'       => $user->bio,
            'image'     => $user->image,
            'token'     => $user->token,
        ];
    }
}