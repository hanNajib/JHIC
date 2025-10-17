<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('role', ['teacher', 'employee', 'principal'])->default('employee');
            $table->string('position')->nullable();
            $table->string('image')->nullable();
            $table->string('subjects')->nullable();

            $table->enum('category', [
                'kepala_sekolah',
                'waka',
                'koordinator',
                'koordinator_jurusan',
                'komite',
                'lainnya'
            ])->default('lainnya');

            $table->foreignId('parent_id')->nullable()->constrained('staff')->nullOnDelete();

            $table->timestamps();
            $table->softDeletes();

            $table->index(['role', 'category'], 'idx_staff_role_category');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('staff');
    }
};
