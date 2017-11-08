<?php

namespace Tests\Profile;

use Tests\BaseTestCase;
use Tests\UseDatabaseTrait;

class FollowUserTest extends BaseTestCase
{

    use UseDatabaseTrait;

    /** @test */
    public function an_authenticated_user_can_post_a_request_to_follow_another_user()
    {
        $user = $this->createUser();
        $requestUser = $this->createUserWithValidToken();

        $headers = ['HTTP_AUTHORIZATION' => 'Token ' . $requestUser->token];

        $response = $this->request(
            'POST',
            "/api/profiles/$user->username/follow",
            null,
            $headers);

        $this->assertEquals(200, $response->getStatusCode(), "Response status code must be 200");
    }

    /** @test */
    public function an_authenticated_user_can_follow_another_user()
    {
        $user = $this->createUser();
        $requestUser = $this->createUserWithValidToken();

        $headers = ['HTTP_AUTHORIZATION' => 'Token ' . $requestUser->token];

        $this->request(
            'POST',
            "/api/profiles/$user->username/follow",
            null,
            $headers);

        $this->assertDatabaseHas(
            'users_following',
            ['user_id' => $requestUser->id, 'following_user_id' => $user->id]
        );
        $this->assertTrue($requestUser->isFollowing($user->id));
    }

    /** @test */
    public function an_unauthenticated_users_can_not_post_follow_request()
    {
        $user = $this->createUser();

        $response = $this->request('POST', "/api/profiles/$user->username/follow");

        $this->assertEquals(401, $response->getStatusCode());
    }

    /** @test */
    public function an_unauthenticated_users_can_not_send_unfollow_request()
    {
        $user = $this->createUser();

        $response = $this->request('DELETE', "/api/profiles/$user->username/follow");

        $this->assertEquals(401, $response->getStatusCode(), 'Status code should 401');
    }

    /** @test */
    public function an_unauthenticated_users_can_send_unfollow_request()
    {
        $user = $this->createUser();
        $requestUser = $this->createUserWithValidToken();
        $requestUser->follow($user->id);
        $this->assertTrue($requestUser->isFollowing($user->id));
        $headers = ['HTTP_AUTHORIZATION' => 'Token ' . $requestUser->token];

        $response = $this->request(
            'DELETE',
            "/api/profiles/$user->username/follow",
            null,
            $headers);

        $this->assertEquals(200, $response->getStatusCode(), 'Status code should 200');
        $this->assertFalse($requestUser->fresh()->isFollowing($user->id));
    }

}