<?php

namespace Tests\Unit\Models;

use Conduit\Models\Article;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Tests\BaseTestCase;
use Tests\UseDatabaseTrait;

class ArticleTest extends BaseTestCase
{

    use UseDatabaseTrait;

    /** @test */
    public function a_tag_can_have_many_tags()
    {
        $article = new Article();

        $this->assertInstanceOf(BelongsToMany::class, $article->tags());
    }
}