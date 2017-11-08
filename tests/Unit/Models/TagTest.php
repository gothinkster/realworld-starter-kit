<?php

namespace Tests\Unit\Models;

use Conduit\Models\Tag;
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
    }
}