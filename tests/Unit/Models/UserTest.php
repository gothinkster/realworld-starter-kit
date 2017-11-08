<?php

namespace Tests\Unit\Models;

use Conduit\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Tests\BaseTestCase;
use Tests\UseDatabaseTrait;

class UserTest extends BaseTestCase
{

    use UseDatabaseTrait;

    /** @test */
    public function a_user_can_have_many_to_many_relationship_with_followers()
    {
        $user = new User();

        $this->assertInstanceOf(BelongsToMany::class, $user->followers());
    }

    /** @test */
    public function a_user_can_follow_another_user()
    {
        $followingUser = $this->createUser();
        $followerUser = $this->createUser();

        $followerUser->follow($followingUser->id);

        $this->assertCount(1, $followerUser->followers);
    }

    /** @test */
    public function a_user_can_tell_of_it_is_followed_by_another_user()
    {
        $user = $this->createUser();
        $followedUser = $this->createUser();
        $this->assertFalse($user->isFollowing($followedUser->id));

        $user->follow($followedUser->id);

        $this->assertTrue($user->fresh()->isFollowing($followedUser->id));
    }

    /** @test */
    public function a_user_can_unfollow_followed_user()
    {
        $user = $this->createUser();
        $followedUser = $this->createUser();
        $user->follow($followedUser->id);
        $this->assertTrue($user->fresh()->isFollowing($followedUser->id));

        $user->unFollow($followedUser->id);

        $this->assertFalse($user->fresh()->isFollowing($followedUser->id));
    }
}