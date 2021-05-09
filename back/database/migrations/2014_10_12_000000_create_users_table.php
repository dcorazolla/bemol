<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email', '100')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('cellphone')->nullable();
            $table->string('phone')->nullable();
            $table->string('instaaccount')->nullable();
            $table->string('faceaccount')->nullable();
            $table->string('twitteraccount')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
