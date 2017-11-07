<?php

$this->factory->define(\Conduit\Models\User::class, function (\Faker\Generator $faker) {
        return [
            'username' => $faker->userName,
            'email'    => $faker->email,
            'token'    => $faker->password,
            'password' => $faker->password,
        ];
    });

