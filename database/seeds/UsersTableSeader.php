<?php

use App\Models\User;
use Phinx\Seed\AbstractSeed;

class UsersTableSeader extends AbstractSeed
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
        $faker = \Faker\Factory::create();
        for ($i = 0; $i < 100; $i++) {
            User::unguard();
            User::create([
                'name'     => $faker->name(),
                'email'    => $faker->email(),
                'password' => $faker->password(),
            ]);
        }
    }
}
