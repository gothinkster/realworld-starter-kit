<?php

namespace Conduit\Services\Auth;

use DateTime;
use Firebase\JWT\JWT;
use Illuminate\Database\Capsule\Manager;
use Slim\Collection;

class Auth
{

    /**
     * @var \Illuminate\Database\Capsule\Manager
     */
    private $db;
    /**
     * @var array
     */
    private $appConfig;

    /**
     * Auth constructor.
     *
     * @param \Illuminate\Database\Capsule\Manager $db
     * @param array|\Slim\Collection               $appConfig
     */
    public function __construct(Manager $db, Collection $appConfig)
    {
        $this->db = $db;
        $this->appConfig = $appConfig;
    }

    /**
     * Generate a new JWT token
     */
    public function generateToken($username)
    {
        $now = new DateTime();
        $future = new DateTime("now +2 hours");

        $payload = [
            "iat" => $now->getTimeStamp(),
            "exp" => $future->getTimeStamp(),
            "jti" => base64_encode(random_bytes(16)),
            'iss' => $this->appConfig['app']['url'],  // Issuer
            "sub" => $username,
        ];

        $secret = $this->appConfig['jwt']['secret'];
        $token = JWT::encode($payload, $secret, "HS256");

        return $token;
    }
}