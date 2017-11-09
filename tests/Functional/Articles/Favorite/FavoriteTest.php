<?php

namespace Tests\Functional\Comments;

use Tests\BaseTestCase;
use Tests\UseDatabaseTrait;

class FavoriteTest extends BaseTestCase
{

    use UseDatabaseTrait;

    /** @test */
    public function an_authenticated_user_may_favorite_an_article()
    {
        $article = $this->createArticle();
        $user = $this->createUserWithValidToken();
        $headers = ['HTTP_AUTHORIZATION' => 'Token ' . $user->token];

        $response = $this->request(
            'POST',
            "/api/articles/$article->slug/favorite",
            null,
            $headers);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertDatabaseHas('user_favorite', ['user_id' => $user->id, 'article_id' => $article->id]);
        $this->assertEquals(1, $user->favoriteArticles()->count());
        $this->assertEquals(1, $article->favorites()->count());
    }
    
    /** @test */
    public function un_unauthenticated_may_not_favorite_articles()
    {
        $article = $this->createArticle();
        $response = $this->request('POST', "/api/articles/$article->slug/favorite");

        $this->assertEquals(401, $response->getStatusCode());
    }

    /** @test */
    public function an_authenticated_user_may_unfavorite_an_article()
    {
        $user = $this->createUserWithValidToken();
        $article = $this->createArticle();
        $user->favoriteArticles()->sync($article->id, false);
        $this->assertEquals(1, $article->favorites()->count());
        $headers = ['HTTP_AUTHORIZATION' => 'Token ' . $user->token];

        $response = $this->request('DELETE',
            "/api/articles/$article->slug/favorite",
            null,
            $headers);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertDatabaseDoesNotHave('user_favorite', ['user_id' => $user->id, 'article_id' => $article->id]);
    }

    /** @test */
    public function unauthenticated_users_may_not_send_request_to_unfavorite_articles()
    {
        $article = $this->createArticle();

        $response = $this->request('DELETE',
            "/api/articles/$article->slug/favorite"
        );

        $this->assertEquals(401, $response->getStatusCode());
    }
}