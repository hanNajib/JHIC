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
       Schema::create('school_data', function (Blueprint $table) {
            $table->id();
            $table->string('type', 100);
            $table->string('name');
            $table->string('value');
            $table->timestamps();
            $table->softDeletes();

            $table->index('type', 'idx_school_data_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('school_data');
    }
};
