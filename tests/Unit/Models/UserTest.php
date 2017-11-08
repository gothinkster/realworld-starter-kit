<?php

namespace Tests\Unit\Models;

use Conduit\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Tests\BaseTestCase;

class UserTest extends BaseTestCase
{
    /** @test */
    public function a_user_can_have_many_to_many_relationship_with_followers()
    {
        $user = new User();

        $this->assertInstanceOf(BelongsToMany::class, $user->followers());
    }
}