<?php

namespace Conduit\Controllers;

use Interop\Container\ContainerInterface;

class BaseController
{

    /**
     * @var \Interop\Container\ContainerInterface
     */
    protected $container;

    /**
     * BaseController constructor.
     *
     * @param \Interop\Container\ContainerInterface $container
     */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

}