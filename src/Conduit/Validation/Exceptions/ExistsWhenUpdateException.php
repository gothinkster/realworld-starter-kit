<?php

namespace Conduit\Validation\Exceptions;

use \Respect\Validation\Exceptions\ValidationException;

class ExistsWhenUpdateException extends ValidationException
{

    public static $defaultTemplates = [
        self::MODE_DEFAULT  => [
            self::STANDARD => 'has already been taken',
        ],
        self::MODE_NEGATIVE => [
            self::STANDARD => 'This does not exist',
        ],
    ];
}
