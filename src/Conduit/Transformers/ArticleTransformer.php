<?php

namespace Conduit\Transformers;

use Conduit\Models\Article;
use League\Fractal\TransformerAbstract;

class ArticleTransformer extends TransformerAbstract
{

    /**
     * Include resources without needing it to be requested.
     *
     * @var array
     */
    protected $defaultIncludes = [
        'author',
    ];

    /**
     * @var integer|null
     */
    protected $requestUserId;

    /**
     * ArticleTransformer constructor.
     *
     * @param int $requestUserId
     */
    public function __construct($requestUserId = null)
    {
        $this->requestUserId = $requestUserId;
    }

    public function transform(Article $article)
    {
        return [
            "slug"           => $article->slug,
            "title"          => $article->title,
            "description"    => $article->description,
            "body"           => $article->body,
            "tagList"        => optional($article->tags()->get(['title']))->pluck('title'),
            'createdAt'      => $article->created_at->toIso8601String(),
            'updatedAt'      => isset($user->update_at) ? $article->update_at->toIso8601String() : $article->update_at,
            "favorited"      => $article->isFavoritedByUser($this->requestUserId),
            "favoritesCount" => $article->favorites()->count(),
        ];
    }


    /**
     * Include Author
     *
     * @param \Conduit\Models\Article $article
     *
     * @return \League\Fractal\Resource\Item
     * @internal param \Conduit\Models\Comment $comment
     *
     */
    public function includeAuthor(Article $article)
    {
        $author = $article->user;

        return $this->item($author, new AuthorTransformer($this->requestUserId));
    }

}