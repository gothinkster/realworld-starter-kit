<?php

namespace Conduit\Transformers;

use Conduit\Models\Article;
use League\Fractal\TransformerAbstract;

class ArticleTransformer extends TransformerAbstract
{

    public function transform(Article $article)
    {
        return [
            "slug"           => $article->slug,
            "title"          => $article->title,
            "description"    => $article->description,
            "body"           => $article->body,
            "tagList"        => ["dragons", "training"],
            'createdAt'      => $article->created_at->toIso8601String(),
            'updatedAt'      => isset($user->update_at) ? $article->update_at->toIso8601String() : $article->update_at,
            "favorited"      => false,
            "favoritesCount" => 0,
            "author"         => [
                "username"  => "jake",
                "bio"       => "I work at statefarm",
                "image"     => "https://i.stack.imgur.com/xHWG8.jpg",
                "following" => false,
            ],
        ];
    }
}