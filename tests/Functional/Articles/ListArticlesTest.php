<?php

namespace Tests\Functional\Articles;

use Tests\BaseTestCase;
use Tests\UseDatabaseTrait;

class ListArticlesTest extends BaseTestCase
{
    use UseDatabaseTrait;

    /** @test */
    public function it_return_all_articles()
    {
        $response = $this->runApp('GET', '/api/articles');

        $this->assertEquals(200, $response->getStatusCode());
    }
}