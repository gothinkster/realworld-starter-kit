<?php

use Conduit\Models\Article;

class ArticlesTableSeeder extends BaseSeeder
{

    /**
     * Run Method.
     *
     * Write your database seeder using this method.
     *
     * More information on writing seeders is available here:
     * http://docs.phinx.org/en/latest/seeding.html
     */
    public function run()
    {
        $this->factory->of(Article::class)->times(10)->create();
    }
}
