<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('tbadmin')) {
            return;
        }

        Schema::create('tbadmin', function (Blueprint $table) {
            $table->tinyIncrements('idAdmin');
            $table->string('username', 20);
            $table->string('password', 32);
            $table->string('nome', 30);
            $table->string('cognome', 30);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbadmin');
    }
};

