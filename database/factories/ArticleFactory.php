<?php

use Conduit\Models\Article;
use Conduit\Models\User;

$this->factory->define(Article::class, function (\Faker\Generator $faker) {
        return [
            'title' => $faker->sentence,
            'description'    => $faker->paragraph,
            'body'    => $faker->paragraphs(3, true),
            'author_id' => function () {
                return $this->factory->of(User::class)->create()->id;
            }
        ];
    });

