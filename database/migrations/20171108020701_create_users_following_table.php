<?php

use Illuminate\Database\Schema\Blueprint;

class CreateUsersFollowingTable extends BaseMigration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->schema->create('users_following', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('user_id');
            $table->unsignedInteger('following_user_id');

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('cascade');
            $table->foreign('following_user_id')
                ->references('id')->on('users')
                ->onDelete('cascade');

            $table->unique(['user_id', 'following_user_id']);

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
        $this->schema->dropIfExists('users_following');
    }
}
