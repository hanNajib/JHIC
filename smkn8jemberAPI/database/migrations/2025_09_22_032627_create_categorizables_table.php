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
       Schema::create('categorizables', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();
            $table->bigInteger('categorizable_id');
            $table->string('categorizable_type', 50);
            $table->timestamp('created_at')->useCurrent();

            $table->index('category_id', 'idx_categorizables_category_id');
            $table->index(['categorizable_id', 'categorizable_type'], 'idx_categorizables_entity');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categorizables');
    }
};
