<?php

namespace Tests\Unit\Models;

use Conduit\Models\Article;
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
    }

    /** @test */
    public function an_article_may_have_many_comments()
    {
        $article = new Article();

        $this->assertInstanceOf(HasMany::class, $article->comments());
    }
}