<?php

use Illuminate\Database\Schema\Blueprint;

class CreateArticlesTable extends BaseMigration
{
    
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->schema->create('articles', function (Blueprint $table) {
            $table->increments('id');
            
            
            $table->timestamps();
        });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->schema->dropIfExists('articles');
    }
}
