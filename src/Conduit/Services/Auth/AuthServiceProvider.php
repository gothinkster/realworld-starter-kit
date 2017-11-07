<?php

namespace Conduit\Services\Auth;

use Interop\Container\ContainerInterface;
use Pimple\Container;
use Pimple\ServiceProviderInterface;

class AuthServiceProvider implements ServiceProviderInterface
{

    /**
     * Registers services on the given container.
     *
     * This method should only be used to configure services and parameters.
     * It should not get services.
     *
     * @param Container $pimple A container instance
     */
    public function register(Container $pimple)
    {
        $pimple['auth'] = function (ContainerInterface $c) {

            return new Auth($c->get('db'), $c->get('settings'));
        };
    }
}