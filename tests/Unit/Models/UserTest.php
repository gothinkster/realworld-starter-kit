<?php

namespace Tests\Unit\Models;

use Conduit\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Tests\BaseTestCase;
use Tests\UseDatabaseTrait;

class UserTest extends BaseTestCase
{

    use UseDatabaseTrait;

    /** @test */
    public function a_user_can_have_many_comments()
    {
        $user = new User();

        $this->assertInstanceOf(HasMany::class, $user->comments());
    }

    /** @test */
    public function a_user_can_have_many_following_users()
    {
        $user = new User();

        $this->assertInstanceOf(BelongsToMany::class, $user->followings());
    }

    /** @test */
    public function a_user_can_follow_another_user()
    {
        $user = $this->createUser();
        $followedUser = $this->createUser();

        $user->follow($followedUser->id);

        $this->assertCount(1, $user->followings);
    }

    /** @test */
    public function a_user_can_tell_if_it_follows_another_user()
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

    /** @test */
    public function a_user_can_not_follow_another_user_twice()
    {
        $user = $this->createUser();
        $followedUser = $this->createUser();
        $user->follow($followedUser->id);
        $this->assertCount(1, $user->followings);

        $user->follow($followedUser->id);
        $this->assertCount(1, $user->fresh()->followings);
    }
}