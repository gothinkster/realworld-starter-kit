<?php

namespace Tests\Functional\Auth;

use Tests\BaseTestCase;
use Tests\UseDatabaseTrait;

class ManageUserTest extends BaseTestCase
{

    use UseDatabaseTrait;

    /** @test */
    public function returns_a_user_that_is_the_current_user()
    {
        $user = $this->createUser();
        $token = $this->getValidToken($user);
        $headers = ['HTTP_AUTHORIZATION' => 'Token ' . $token];

        $response = $this->request('GET', '/api/user', null, $headers);

        $body = json_decode((string)$response->getBody(), true);

        $this->assertEquals(200, $response->getStatusCode(), "Response must return 200 status code");
        $this->assertEquals($body['user']['username'], $user->username);
    }

    /** @test */
    public function unauthenticated_requests_may_not_get_user_data()
    {
        $response = $this->request('GET', '/api/user');
        $this->assertEquals(401, $response->getStatusCode(), "Response must return 401 status code");
    }

    /** @test */
    public function an_authenticated_user_can_update_his_details()
    {
        $user = $this->createUserWithValidToken(['username' => 'superUserDo']);
        $this->assertEquals('superUserDo', $user->username);
        $headers = ['HTTP_AUTHORIZATION' => 'Token ' . $user->token];

        $payload = [
            'user' =>
                ['username' => 'substituteUserAndDo'],
        ];

        $response = $this->request('PUT', '/api/user', $payload, $headers);

        $this->assertEquals(200, $response->getStatusCode(), "Response must return 200 status code");
        $this->assertEquals('substituteUserAndDo', $user->fresh()->username);
    }
}