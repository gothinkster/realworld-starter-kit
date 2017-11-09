<?php

class CreateTableTemplateGenerator extends AbstractTemplateGenerator
{
    
    public function getMigrationTemplate()
    {
        $name = $this->input->getArgument('name');
        $template = file_get_contents(static::TEMPLATE_DIRECTORY . 'createTable.php.dist');
        
        $name = str_after($name, 'Create');
        $name = snake_case($name);
        $name = str_replace('_table', '', $name);
        
        return str_replace('$tableName', $name, $template);
    }
    
    
}
