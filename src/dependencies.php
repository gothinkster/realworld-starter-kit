<?php
// DIC configuration

$container = $app->getContainer();

// view renderer
$container['renderer'] = function ($c) {
    $settings = $c->get('settings')['renderer'];
    return new Slim\Views\PhpRenderer($settings['template_path']);
};

// monolog
$container['logger'] = function ($c) {
    $settings = $c->get('settings')['logger'];
    $logger = new Monolog\Logger($settings['name']);
    $logger->pushProcessor(new Monolog\Processor\UidProcessor());
    $logger->pushHandler(new Monolog\Handler\StreamHandler($settings['path'], $settings['level']));
    return $logger;
};


// illuminate/database
$container['db'] = function ($c) {

    $config = $c->get('settings')['database'];

    $capsule = new Illuminate\Database\Capsule\Manager;

    $capsule->addConnection([
        'driver'    => $config['driver'],
        'host'      => $config['host'],
        'database'  => $config['database'],
        'username'  => $config['username'],
        'password'  => $config['password'],
        'charset'   => 'utf8',
        'collation' => 'utf8_unicode_ci',
        'prefix'    => '',
    ]);

// Make this Capsule instance available globally via static methods... (optional)
    $capsule->setAsGlobal();

// Setup the Eloquent ORM... (optional; unless you've used setEventDispatcher())
    $capsule->bootEloquent();

    return $capsule;
};