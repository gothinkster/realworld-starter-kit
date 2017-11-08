<?php

use Illuminate\Database\Schema\Blueprint;

class CreateTagsTable extends BaseMigration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->schema->create('tags', function (Blueprint $table) {
            $table->increments('id');

            $table->string('title')->unique();

            $table->timestamps();
        });

        $this->schema->create('article_tag', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('article_id');
            $table->unsignedInteger('tag_id');

            $table->foreign('article_id')
                ->references('id')->on('articles')
                ->onDelete('cascade');

            $table->foreign('tag_id')
                ->references('id')->on('tags')
                ->onDelete('cascade');

            $table->unique(['article_id', 'tag_id']);

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
        $this->schema->dropIfExists('article_tag');
        $this->schema->dropIfExists('tags');
    }
}
