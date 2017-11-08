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

            $table->string('slug');
            $table->string('title');
            $table->text('description');
            $table->text('body');
            $table->string('author_id');

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('update');

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
