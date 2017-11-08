<?php

class BaseSeeder extends \Phinx\Seed\AbstractSeed
{

    const FACTORIES__PATH = ROOT . 'database/factories/';

    /**
     * @var \Illuminate\Database\Eloquent\Factory
     */
    protected $factory;

    protected function init()
    {
        $faker = Faker\Factory::create();
        $this->factory = new \Illuminate\Database\Eloquent\Factory($faker);
        $factories = glob(static::FACTORIES__PATH . '*.php');
        foreach ($factories as $factory) {
            /** @noinspection PhpIncludeInspection */
            require $factory;
        }
    }
}