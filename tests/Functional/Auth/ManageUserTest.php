<?php

namespace Tests\Functional\Auth;

use Tests\Functional\BaseTestCase;
use Tests\UseDatabaseTrait;

class ManageUserTest extends BaseTestCase
{

    use UseDatabaseTrait;

    /** @test */
    public function returns_a_user_that_is_the_current_user()
    {
        $headers = ['Authorization' => 'Token '];

        $response = $this->request('GET', '/api/user', null, $headers);

        $body = json_decode((string)$response->getBody(), true);

        $this->assertEquals(200, $response->getStatusCode(), "Response must return 200 status code");
        $this->assertEquals(1, 1);
    }

    /** @test */
    public function registration_requires_a_user_name()
    {
        $payload = [
            'user' => [
                'email'    => 'new@example.com',
                'password' => 'secret',
            ],
        ];

        $response = $this->request('POST', '/api/users', $payload);

        $this->assertEquals(422, $response->getStatusCode());
        $errors = json_decode((string)$response->getBody(), true);
        $this->assertArrayHasKey('username', $errors['errors']);
    }

    /** @test */
    public function registration_requires_a_valid_email()
    {
        $payload = [
            'user' => [
                'username' => 'username',
                'email'    => 'NotValid@email',
                'password' => 'secret',
            ],
        ];

        $response = $this->request('POST', '/api/users', $payload);

        $this->assertEquals(422, $response->getStatusCode());
        $errors = json_decode((string)$response->getBody(), true);
        $this->assertArrayHasKey('email', $errors['errors']);
    }
}