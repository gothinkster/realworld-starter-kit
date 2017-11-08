<?php

namespace Tests\Functional\Comments;

use Tests\BaseTestCase;
use Tests\UseDatabaseTrait;

class GetCommentTest extends BaseTestCase
{

    use UseDatabaseTrait;

    /** @test */
    public function get_comment_returns_all_comments_for_an_article()
    {
        $user = $this->createUser();
        $article = $this->createArticle(['user_id' => $user->id]);
        $this->createComment(['user_id' => $user->id, 'article_id' => $article->id]);
        $this->createComment(['user_id' => $user->id, 'article_id' => $article->id]);
        $this->createComment(['user_id' => $user->id, 'article_id' => $article->id]);
        $this->assertCount(3, $article->fresh()->comments);
        $response = $this->request(
            'GET',
            "/api/articles/$article->slug/comments"
        );
        $body = json_decode((string)$response->getBody(), true);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertArrayHasKey('comments', $body);
        $this->assertCount(3, $body['comments']);
    }

    /** @test */
    public function get_comments_returns_comments_with_optional_authentication_and_includes_correct_following_status()
    {
        $user = $this->createUser();
        $requestUser = $this->createUserWithValidToken();
        $requestUser->follow($user->id);
        $headers = ['HTTP_AUTHORIZATION' => 'Token ' . $requestUser->token];

        $article = $this->createArticle(['user_id' => $user->id]);
        $comment = $this->createComment(['user_id' => $user->id, 'article_id' => $article->id]);
        $this->assertEquals($comment->user_id, $user->id);

        $response = $this->request(
            'GET',
            "/api/articles/$article->slug/comments",
            null,
            $headers
        );

        $body = json_decode((string)$response->getBody(), true);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertArrayHasKey('comments', $body);
        $this->assertTrue($body['comments'][0]['author']['following']);
    }

    /** @test */
    public function get_comment_returns_401_when_an_invalid_token_is_attached()
    {
        $user = $this->createUser();
        $headers = ['HTTP_AUTHORIZATION' => 'Token Invalid Token'];
        $article = $this->createArticle(['user_id' => $user->id]);

        $response = $this->request(
            'GET',
            "/api/articles/$article->slug/comments",
            null,
            $headers
        );

        $this->assertEquals(401,
            $response->getStatusCode(),
            "Response status code must be 401 because of an invalid token");
    }
}