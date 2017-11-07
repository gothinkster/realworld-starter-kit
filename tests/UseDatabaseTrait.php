<?php

namespace Tests;

use Phinx\Console\PhinxApplication;
use Symfony\Component\Console\Input\StringInput;
use Symfony\Component\Console\Output\NullOutput;

trait UseDatabaseTrait
{

    protected function runMigration()
    {
        $app = new PhinxApplication();
        $app->doRun(new StringInput("migrate"), new NullOutput());
    }

    protected function rollbackMigration()
    {
        $app = new PhinxApplication();
        $app->doRun(new StringInput("rollback -t 0 -f"), new NullOutput());
    }
}