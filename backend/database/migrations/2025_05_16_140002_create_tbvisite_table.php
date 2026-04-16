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
        if (Schema::hasTable('tbvisite')) {
            return;
        }

        Schema::create('tbvisite', function (Blueprint $table) {
            $table->increments('id_visita');
            $table->integer('fk_attrazione');
            $table->integer('fk_biglietto');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbvisite');
    }
};

