<?php

namespace Tests;

use Conduit\Models\Article;
use Conduit\Models\Comment;
use Conduit\Models\User;
use Faker\Factory;
use PHPUnit\Framework\TestCase;
use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use Slim\Http\Environment;

/**
 * This is an example class that shows how you could set up a method that
 * runs the application. Note that it doesn't cover all use-cases and is
 * tuned to the specifics of this skeleton app, so if your needs are
 * different, you'll need to change it.
 */
abstract class BaseTestCase extends TestCase
{

    /** @var  \Slim\App */
    protected $app;

    /**
     * Use middleware when running application?
     *
     * @var bool
     */
    protected $withMiddleware = true;

    /**
     * Sets up the fixture, for example, open a network connection.
     * This method is called before a test is executed.
     */
    protected function setUp()
    {
        parent::setUp();
        $this->createApplication();

        $traits = array_flip(class_uses_recursive(static::class));
        if (isset($traits[UseDatabaseTrait::class])) {
            $this->runMigration();
        }
    }

    /**
     * Tears down the fixture, for example, close a network connection.
     * This method is called after a test is executed.
     */
    protected function tearDown()
    {
        $traits = array_flip(class_uses_recursive(static::class));
        if (isset($traits[UseDatabaseTrait::class])) {
            $this->rollbackMigration();
        }
        unset($this->app);
        parent::tearDown();
    }

    /**
     * Process the application given a request method and URI
     *
     * @param string            $requestMethod the request method (e.g. GET, POST, etc.)
     * @param string            $requestUri    the request URI
     * @param array|object|null $requestData   the request data
     *
     * @param array             $headers
     *
     * @return \Psr\Http\Message\ResponseInterface|\Slim\Http\Response
     */
    public function runApp($requestMethod, $requestUri, $requestData = null, $headers = [])
    {
        // Create a mock environment for testing with
        $environment = Environment::mock(
            array_merge(
                [
                    'REQUEST_METHOD'   => $requestMethod,
                    'REQUEST_URI'      => $requestUri,
                    'Content-Type'     => 'application/json',
                    'X-Requested-With' => 'XMLHttpRequest',
                ],
                $headers
            )
        );

        // Set up a request object based on the environment
        $request = Request::createFromEnvironment($environment);

        // Add request data, if it exists
        if (isset($requestData)) {
            $request = $request->withParsedBody($requestData);
        }

        // Set up a response object
        $response = new Response();

        // Process the application and Return the response
        return $this->app->process($request, $response);
    }

    /**
     * Make a request to the Api
     *
     * @param       $requestMethod
     * @param       $requestUri
     * @param null  $requestData
     * @param array $headers
     *
     * @return \Psr\Http\Message\ResponseInterface|\Slim\Http\Response
     */
    public function request($requestMethod, $requestUri, $requestData = null, $headers = [])
    {
        return $this->runApp($requestMethod, $requestUri, $requestData, $headers);
    }

    /**
     * Generate a new JWT token for the given user
     *
     * @param \Conduit\Models\User $user
     *
     * @return mixed
     */
    public function getValidToken(User $user)
    {
        $user->update([
            'token' =>
                $token = $this->app->getContainer()->get('auth')->generateToken($user),
        ]);

        return $token;
    }

    /**
     * Create a new User
     *
     * @param array $overrides
     *
     * @return User
     */
    public function createUser($overrides = [])
    {
        $faker = Factory::create();
        $attributes = [
            'username' => $faker->userName,
            'email'    => $faker->email,
            'password' => $password = password_hash($faker->password, PASSWORD_DEFAULT),
        ];
        $overrides['password'] = isset($overrides['password']) ? $overrides['password'] : $password;

        return User::create(array_merge($attributes, $overrides));
    }


    /**
     * Create a new Article
     *
     * @param array $overrides
     *
     * @return Article
     */
    public function createArticle($overrides = [])
    {
        $faker = Factory::create();
        $attributes = [
            'title'       => $title = $faker->sentence,
            'slug'        => str_slug($title),
            'description' => $faker->paragraph,
            'body'        => $faker->paragraphs(3, true),
            'user_id'     => isset($overrides['user_id']) ? $overrides['user_id'] : $this->createUserWithValidToken()->id,
        ];

        return Article::create(array_merge($attributes, $overrides));
    }

    /**
     * Create a new Comment
     *
     * @param array $overrides
     *
     * @return Comment
     */
    public function createComment($overrides = [])
    {
        $faker = Factory::create();
        $attributes = [
            'body'       => $faker->paragraphs(3, true),
            'user_id'    => $user_id = isset($overrides['user_id']) ? $overrides['user_id'] : $this->createUserWithValidToken()->id,
            'article_id' => isset($overrides['article_id']) ? $overrides['article_id'] : $this->createArticle(['user_id' => $user_id])->id,
        ];

        return Comment::create(array_merge($attributes, $overrides));
    }

    /**
     * Create A User with valid JWT Token
     *
     * @param array $overrides
     *
     * @return User
     */
    public function createUserWithValidToken($overrides = [])
    {
        $user = $this->createUser($overrides);
        $this->getValidToken($user);

        return $user->fresh();
    }

    protected function createApplication()
    {
        // Use the application settings
        $settings = require __DIR__ . '/../src/settings.php';

        // Instantiate the application
        $this->app = $app = new App($settings);

        // Set up dependencies
        require ROOT . 'src/dependencies.php';

        // Register middleware
        if ($this->withMiddleware) {
            require ROOT . 'src/middleware.php';
        }

        // Register routes
        require ROOT . 'src/routes.php';
    }
}
