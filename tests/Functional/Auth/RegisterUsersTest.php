<?php

namespace Tests\Functional\Auth;

use Tests\Functional\BaseTestCase;

class RegisterUsersTest extends BaseTestCase
{

    /** @test */
    public function it_creates_new_user_when_provided_with_all_required_parameters()
    {
        $payload = [
            'user' => [
                'username' => 'newUser',
                'email'    => 'new@example.com',
                'password' => 'secret',
            ],
        ];

        $response = $this->runApp('POST', '/api/users', $payload);
        $body = json_decode((string)$response->getBody(), true);

        $this->assertEquals(200, $response->getStatusCode(), "Response must return 200 status code");
        // Validate Database has new user;
        $this->assertArraySubset($payload, $body, 'Return response must contains user data');
    }
}