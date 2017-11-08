<?php

namespace Tests\Functional\Articles;

use Tests\BaseTestCase;
use Tests\UseDatabaseTrait;

class CreateArticleTest extends BaseTestCase
{

    use UseDatabaseTrait;

    /** @test */
    public function un_authenticated_user_may_post_new_article()
    {
        $user = $this->createUserWithValidToken();
        $headers = ['HTTP_AUTHORIZATION' => 'Token ' . $user->token];
        $payload = [
            'article' => [
                'title'       => 'How to train your dragon',
                'description' => 'Ever wonder how?',
                'body'        => 'You have to believe',
            ],
        ];

        $response = $this->request('POST', '/api/articles', $payload, $headers);

        $this->assertEquals(200, $response->getStatusCode());
    }


    /** @test */
    public function un_unauthenticated_may_not_post_articles()
    {
        $response = $this->request('POST', '/api/articles');

        $this->assertEquals(401, $response->getStatusCode());
    }

    /** @test */
    public function create_article_require_title()
    {
        $user = $this->createUserWithValidToken();
        $headers = ['HTTP_AUTHORIZATION' => 'Token ' . $user->token];
        $payload = [
            'article' => [
                'description' => 'Ever wonder how?',
                'body'        => 'You have to believe',
            ],
        ];

        $response = $this->request('POST', '/api/articles', $payload, $headers);
        $body = json_decode((string)$response->getBody(), true);

        $this->assertEquals(422, $response->getStatusCode());
        $this->assertArrayHasKey('title', $body['errors']);
    }

    /** @test */
    public function create_article_require_description()
    {
        $user = $this->createUserWithValidToken();
        $headers = ['HTTP_AUTHORIZATION' => 'Token ' . $user->token];
        $payload = [
            'article' => [
                'title' => 'How to train your dragon',
                'body'  => 'You have to believe',
            ],
        ];

        $response = $this->request('POST', '/api/articles', $payload, $headers);
        $body = json_decode((string)$response->getBody(), true);

        $this->assertEquals(422, $response->getStatusCode());
        $this->assertArrayHasKey('description', $body['errors']);
    }

    /** @test */
    public function create_article_require_body()
    {
        $user = $this->createUserWithValidToken();
        $headers = ['HTTP_AUTHORIZATION' => 'Token ' . $user->token];
        $payload = [
            'article' => [
                'title'       => 'How to train your dragon',
                'description' => 'Ever wonder how?',
            ],
        ];

        $response = $this->request('POST', '/api/articles', $payload, $headers);
        $body = json_decode((string)$response->getBody(), true);

        $this->assertEquals(422, $response->getStatusCode());
        $this->assertArrayHasKey('body', $body['errors']);
    }

}