<?php

namespace Tests\Functional\Comments;

use Conduit\Models\Tag;
use Tests\BaseTestCase;
use Tests\UseDatabaseTrait;

class GetAllTagsTest extends BaseTestCase
{

    use UseDatabaseTrait;

    /** @test */
    public function it_return_all_tags()
    {
        $tag1 = Tag::create(['title' => 'AngularJS']);
        $tag2 = Tag::create(['title' => 'dragons']);

        $response = $this->request('GET', '/api/tags');
        $body = json_decode((string)$response->getBody(), true);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertArrayHasKey('tags', $body);
        $this->assertCount(2, $body['tags']);
        $this->assertSame(
            [
                "tags" => [
                    "AngularJS",
                    "dragons",
                ],
            ],
            $body);
    }
}