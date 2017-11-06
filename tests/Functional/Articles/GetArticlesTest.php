<?php

namespace Tests\Functional\Articles;

use Tests\Functional\BaseTestCase;

class GetArticlesTest extends BaseTestCase
{
    /** @test */
    public function it_return_all_articles()
    {
        $response = $this->runApp('GET', '/api/articles');

        $this->assertEquals(200, $response->getStatusCode());
    }
}