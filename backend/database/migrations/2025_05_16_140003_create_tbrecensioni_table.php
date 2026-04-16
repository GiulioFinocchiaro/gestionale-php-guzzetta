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
        if (Schema::hasTable('tbrecensioni')) {
            return;
        }

        Schema::create('tbrecensioni', function (Blueprint $table) {
            $table->increments('id_recensione');
            $table->integer('fk_visita');
            $table->unsignedTinyInteger('voto');
            $table->string('recensione', 200);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbrecensioni');
    }
};

