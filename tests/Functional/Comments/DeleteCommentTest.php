<?php

namespace Tests\Functional\Comments;

use Tests\BaseTestCase;
use Tests\UseDatabaseTrait;

class DeleteCommentTest extends BaseTestCase
{

    use UseDatabaseTrait;

    /** @test */
    public function an_authenticated_user_may_delete_his_comment()
    {
        $user = $this->createUserWithValidToken();
        $comment = $this->createComment(['user_id' => $user->id]);
        $headers = ['HTTP_AUTHORIZATION' => 'Token ' . $user->token];

        $response = $this->request('DELETE',
            "/api/articles/$comment->article->slug/comments/$comment->id",
            null,
            $headers);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertDatabaseDoesNotHave('comments', ['body' => $comment->body]);
    }

    /** @test */
    public function unauthenticated_users_may_not_send_request_to_delete_comments()
    {
        $comment = $this->createComment();

        $response = $this->request('DELETE',
            "/api/articles/$comment->article->slug/comments/$comment->id"
        );

        $this->assertEquals(401, $response->getStatusCode());
    }

    /** @test */
    public function only_the_owner_of_the_comment_can_delete_the_comment()
    {
        $comment = $this->createComment();
        $unauthorizedUser = $this->createUserWithValidToken();
        $headers = ['HTTP_AUTHORIZATION' => 'Token ' . $unauthorizedUser->token];

        $response = $this->request('DELETE',
            "/api/articles/$comment->article->slug/comments/$comment->id",
            null,
            $headers);

        $this->assertEquals(403, $response->getStatusCode());
        $this->assertDatabaseHas('comments', ['body' => $comment->body]);
    }


}