<?php

namespace Tests\Profile;

use Tests\Functional\BaseTestCase;
use Tests\UseDatabaseTrait;

class ProfileTest extends BaseTestCase
{

    use UseDatabaseTrait;

    /** @test */
    public function get_profile_returns_profile_without_authentication()
    {
        $user = $this->createUser();

        $response = $this->request('GET', '/api/profiles/' . $user->username);
        $body = json_decode((string)$response->getBody(), true);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertArrayHasKey('profile', $body);
        $this->assertEquals($user->username, $body['profile']['username']);
    }

    /** @test */
    public function get_profile_returns_profile_with_optional_authentication()
    {
        $user = $this->createUser();
        $requestUser = $this->createUserWithValidToken();
        $headers = ['HTTP_AUTHORIZATION' => 'Token ' . $requestUser->token];

        $response = $this->request('GET', '/api/profiles/' . $user->username, null, $headers);
        $body = json_decode((string)$response->getBody(), true);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertArrayHasKey('profile', $body);
    }

    /** @test */
    public function get_profile_returns_401_when_an_invalid_token_is_attached()
    {
        $user = $this->createUser();
        $headers = ['HTTP_AUTHORIZATION' => 'Token Invalid Token'];

        $response = $this->request('GET', '/api/profiles/' . $user->username, null, $headers);

        $this->assertEquals(401,
            $response->getStatusCode(),
            "Response status code must be 401 because of an invalid token");
    }
}