<?php

class TemplateGenerator extends AbstractTemplateGenerator
{
    
    public function getMigrationTemplate()
    {
        return file_get_contents(static::TEMPLATE_DIRECTORY . 'defaultTemplate.dist');
    }
    
    
    
}
