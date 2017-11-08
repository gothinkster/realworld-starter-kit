<?php

namespace Conduit\Transformers;

use Conduit\Models\Article;
use Conduit\Models\Comment;
use League\Fractal\TransformerAbstract;

class CommentTransformer extends TransformerAbstract
{

    public function transform(Comment $comment)
    {
        return [
            'id'        => $comment->id,
            'createdAt'      => $comment->created_at->toIso8601String(),
            'updatedAt'      => isset($user->update_at) ? $comment->update_at->toIso8601String() : $comment->update_at,
            'body'      => $comment->body,
            'author'    => [
                'username'  => 'jake',
                'bio'       => 'I work at statefarm',
                'image'     => 'https=>//i.stack.imgur.com/xHWG8.jpg',
                'following' => false,
            ],
        ];
    }
}