<?php

namespace Tests\Unit\Models;

use Conduit\Models\Comment;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Tests\BaseTestCase;
use Tests\UseDatabaseTrait;

class CommentTest extends BaseTestCase
{

    use UseDatabaseTrait;

    /** @test */
    public function a_comment_belongs_to_an_article()
    {
        $comment = new Comment();

        $this->assertInstanceOf(BelongsTo::class, $comment->article());
    }

    /** @test */
    public function a_comment_belongs_to_a_user()
    {
        $comment = new Comment();

        $this->assertInstanceOf(BelongsTo::class, $comment->user());
    }
}