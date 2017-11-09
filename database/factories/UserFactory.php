<?php

$this->factory->define(\Conduit\Models\User::class, function (\Faker\Generator $faker) {
        return [
            'username' => $faker->userName,
            'email'    => $faker->email,
            'token'    => $faker->password,
            'password' => password_hash($faker->password, PASSWORD_DEFAULT),
            'image' => 'https://static.productionready.io/images/smiley-cyrus.jpg',
        ];
    });

