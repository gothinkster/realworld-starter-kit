<?php

namespace Tests\Functional\Articles;

use Conduit\Models\Article;
use Tests\BaseTestCase;
use Tests\UseDatabaseTrait;

class ShowSingleArticleTest extends BaseTestCase
{
    use UseDatabaseTrait;

    /** @test */
    public function it_return_a_single_article()
    {
        $user = $this->createUser();
        $article = Article::create([
            'slug'           => 'how-to-train-your-dragon',
            'title'          => 'How to train your dragon',
            'description'    => 'Ever wonder how?',
            'body'           => 'It takes a Jacobian',
            'user_id'      => $user->id,
        ]);

        $response = $this->request('GET', "/api/articles/$article->slug");
        $body = json_decode((string)$response->getBody(), true);
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertArrayHasKey('article', $body);
    }

    /** @test */
    public function it_return_the_correct_author_following_status()
    {
        $user = $this->createUser();
        $requestUser = $this->createUserWithValidToken();
        $requestUser->follow($user->id);
        $headers = ['HTTP_AUTHORIZATION' => 'Token ' . $requestUser->token];

        $article = $this->createArticle(['user_id' => $user->id]);

        $response = $this->request(
            'GET',
            "/api/articles/$article->slug",
            null,
            $headers
        );

        $body = json_decode((string)$response->getBody(), true);
        $this->assertTrue($body['article']['author']['following']);
    }
}