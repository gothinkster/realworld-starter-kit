<?php

use Conduit\Models\Article;
use Conduit\Models\User;

$this->factory->define(Article::class, function (\Faker\Generator $faker) {
        return [
            'title'       => $title = $faker->sentence,
            'slug'        => str_slug($title),
            'description' => $faker->paragraph,
            'body'        => $faker->paragraphs(3, true),
            'user_id'   => function () {
                return $this->factory->of(User::class)->create()->id;
            },
        ];
    });

