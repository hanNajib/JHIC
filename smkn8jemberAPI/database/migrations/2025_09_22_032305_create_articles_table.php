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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('image');
            $table->longText('content');
            $table->enum('status', ['draft', 'pending', 'rejected', 'published'])->default('draft');
            $table->bigInteger('views')->default(0);
            $table->foreignId('author_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index('author_id', 'idx_articles_author_id');
            $table->index('views', 'idx_articles_views');
            $table->index('status', 'idx_articles_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
