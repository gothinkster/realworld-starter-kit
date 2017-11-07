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

    protected function assertDatabaseHas($table, array $data)
    {
        $this->assertTrue($this->app->getContainer()->get('db')->table($table)->where($data)->count() > 0,
            sprintf("$table table does not have %s under the column %s",
                $key = array_keys($data)[0],
                $data[$key]
            ));
    }
}