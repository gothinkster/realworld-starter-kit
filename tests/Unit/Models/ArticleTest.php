<?php

namespace Tests\Unit\Models;

use Conduit\Models\Article;
use Conduit\Models\Comment;
use Conduit\Models\Tag;
use Conduit\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Tests\BaseTestCase;
use Tests\UseDatabaseTrait;

class ArticleTest extends BaseTestCase
{

    use UseDatabaseTrait;

    /** @test */
    public function an_article_can_have_many_tags()
    {
        $article = new Article();

        $this->assertInstanceOf(BelongsToMany::class, $article->tags());
        $this->assertInstanceOf(Tag::class, $article->tags()->getRelated());
    }

    /** @test */
    public function an_article_may_have_many_comments()
    {
        $article = new Article();

        $this->assertInstanceOf(HasMany::class, $article->comments());
        $this->assertInstanceOf(Comment::class, $article->comments()->getRelated());
    }

    /** @test */
    public function an_article_has_an_author()
    {
        $article = new Article();

        $this->assertInstanceOf(BelongsTo::class, $article->user());
        $this->assertInstanceOf(User::class, $article->user()->getRelated());
    }

    /** @test */
    public function it_can_be_favorited_by_users()
    {
        $article = new Article();

        $this->assertInstanceOf(BelongsToMany::class, $article->favorites());
        $this->assertInstanceOf(User::class, $article->favorites()->getRelated());
    }
}