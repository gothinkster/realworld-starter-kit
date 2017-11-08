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
}