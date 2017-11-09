<?php

namespace Tests\Unit\Models;

use Conduit\Models\Article;
use Conduit\Models\Tag;
use Conduit\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Tests\BaseTestCase;
use Tests\UseDatabaseTrait;

class TagTest extends BaseTestCase
{

    use UseDatabaseTrait;

    /** @test */
    public function a_tag_can_have_many_articles()
    {
        $tag = new Tag();

        $this->assertInstanceOf(BelongsToMany::class, $tag->articles());
        $this->assertInstanceOf(Article::class, $tag->articles()->getRelated());
    }

    /** @test */
    public function a_tag_belongs_to_user()
    {
        $tag = new Tag();

        $this->assertInstanceOf(BelongsTo::class, $tag->user());
        $this->assertInstanceOf(User::class, $tag->user()->getRelated());
    }
}