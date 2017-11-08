<?php

namespace Tests\Functional\Auth;

use Tests\BaseTestCase;
use Tests\UseDatabaseTrait;

class RegisterUsersTest extends BaseTestCase
{

    use UseDatabaseTrait;

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

        $response = $this->request('POST', '/api/users', $payload);
        $body = json_decode((string)$response->getBody(), true);

        $this->assertEquals(200, $response->getStatusCode(), "Response must return 200 status code");
        $this->assertDatabaseHas('users', ['username' => 'newUser']);
        unset($payload['user']['password']);
        $this->assertArraySubset($payload, $body, 'Return response must contains user data');
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