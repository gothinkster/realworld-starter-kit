<?php

namespace Conduit\Validation\Rules;

use Respect\Validation\Rules\AbstractRule;

class ExistsInTable extends AbstractRule
{

    /**
     * @var
     */
    private $columns;

    /**
     * @var \Illuminate\Database\Query\Builder
     */
    private $table;

    public function __construct($table, $columns)
    {
        $this->table = $table;
        $this->columns = $columns;
    }


    public function validate($input)
    {
        return ! $this->table->where($this->columns, $input)->exists();
    }
}