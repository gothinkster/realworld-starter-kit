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
            'author_id'      => $user->id,
        ]);

        $response = $this->request('GET', "/api/articles/$article->id");
        $body = json_decode((string)$response->getBody(), true);
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertArrayHasKey('article', $body);
    }
}