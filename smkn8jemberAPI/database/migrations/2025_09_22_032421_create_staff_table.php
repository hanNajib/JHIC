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
        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('role', ['teacher', 'employee'])->default('employee');
            $table->enum('position', [
                'Kepala Sekolah','Tim Pengembang Sekolah','Kepala Tata Usaha','Bendahara BOS','Bendahara BPOPP','Koord. PIP',
                'Waka Kesiswaan','Koord. BKK','Koord. Kedisiplinan','Pembina OSIS','Koord. Ekstrakurikuler','Koord. KOPSIS',
                'Waka Kurikulum','Koord. PSDM','Koord. PBM','Koord. Evaluasi KBM','Waka Sarpras','Koord. Pengadaan',
                'Koord. Pemeliharaan','Pengembang IT','Koord. Perpustakaan','Koord. Lab/Bengkel','Koord. Kebersihan Lingkungan',
                'Waka Humas','Koord. Sosial','Koord. PKL','Koord. Media Promosi','Koord. LKS','Koord. UP',
                'Kaprodi T. Otomotif','Wakaprodi T. Otomotif','Kaprodi TKJ','Kaprodi RPL','Kaprodi DKV',
                'Kaprodi Agribisnis Tanaman','Wakaprodi Agribisnis Tanaman','Wali Kelas','Pendidik dan Tenaga Kependidikan'
            ]);
            $table->string('image')->nullable();
            $table->string('subjects')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('role', 'idx_staff_role');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff');
    }
};
