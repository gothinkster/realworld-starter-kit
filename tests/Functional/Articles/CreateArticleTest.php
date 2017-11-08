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

}