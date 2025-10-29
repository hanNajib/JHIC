<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Gallery;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class GambarSeeder extends Seeder
{
    public function run(): void
    {
        $categoryTypes = [
            ['type' => 'gallery', 'name' => 'Event', 'color' => '#f97316'],
            ['type' => 'gallery', 'name' => 'Kegiatan', 'color' => '#f97316'],
            ['type' => 'gallery', 'name' => 'Prestasi', 'color' => '#f97316'],
            ['type' => 'gallery', 'name' => 'Fasilitas', 'color' => '#f97316'],
        ];

        // Buat kategori
        $categories = [];
        foreach ($categoryTypes as $catData) {
            $categories[] = Category::firstOrCreate(
                ['type' => $catData['type'], 'name' => $catData['name']],
                ['color' => $catData['color']]
            );
        }

        $now = Carbon::now();
        $baseDate = $now->copy()->subDays(30);

        $announcements = [
            [
                'title' => 'SMKN 8 Jember Sapu Bersih Kompetisi GEMPITA 2024',
                'description' => 'SMKN 8 Jember menorehkan prestasi luar biasa dalam ajang GEMPITA 2024 yang diselenggarakan oleh PT. Petrokimia Gresik.',
                'image' => 'gempita.png',
                'category_id' => 2
            ],
            [
                'title' => 'Program Keahlian Pertanian Ikuti Expo SMK Jatim 2024',
                'description' => 'Jurusan Pertanian SMKN 8 Jember ikut serta dalam Expo SMK Jatim 2024 untuk memamerkan karya dan inovasi siswa.',
                'image' => 'exspo.png',
                'category_id' => 0
            ],
            [
                'title' => 'Kegiatan Donor Darah PMR Wira SMKN 8 Jember',
                'description' => 'Ekstrakurikuler PMR Wira SMKN 8 Jember sukses menyelenggarakan kegiatan donor darah untuk siswa dan staf.',
                'image' => 'pmr.png',
                'category_id' => 1
            ],
            [
                'title' => 'Dies Natalis ke-16 SMKN 8 Jember',
                'description' => 'Perayaan Dies Natalis ke-16 SMKN 8 Jember dengan tema “16 Tahun Menuju Vokasi Unggul dan Berprestasi”.',
                'image' => 'diesnatalis.png',
                'category_id' => 0
            ],
            [
                'title' => 'Prestasi Gemilang Siswa SMKN 8 Jember di Kejurda Aeromodelling 2024',
                'description' => 'Siswa SMKN 8 Jember meraih juara dalam Kejurda Aeromodelling 2024 cabang Control Line.',
                'image' => 'aeromodeling.png',
                'category_id' => 2
            ],
            [
                'title' => 'Tim Ekstrakurikuler Tari Eskalaber Wakili Kecamatan Semboro',
                'description' => 'Tim Eskalaber Dance Team SMKN 8 Jember tampil di Jember Nusantara dan memukau penonton.',
                'image' => 'tari.png',
                'category_id' => 2
            ],
            [
                'title' => 'Tim Produksi Film SMKN 8 Jember: Cahaya Toleransi',
                'description' => 'Tim film SMKN 8 Jember meraih prestasi di Kejuaraan Film Moderasi Beragama Tingkat Provinsi Jatim.',
                'image' => 'film.png',
                'category_id' => 2
            ],
            [
                'title' => 'Prestasi Gemilang Ekstrakurikuler Pencak Silat SMKN 8 Jember',
                'description' => 'Ekstrakurikuler Pencak Silat SMKN 8 Jember meraih Juara 2 Nasional pada Jember Championship 2 Tahun 2025.',
                'image' => 'silat.png',
                'category_id' => 2
            ],
            [
                'title' => 'Sosialisasi Perguruan Tinggi oleh Alumni SMKN 8 Jember',
                'description' => 'Alumni SMKN 8 Jember mengadakan sosialisasi perguruan tinggi bagi siswa kelas XII dan XIII.',
                'image' => 'sosialisasi.png',
                'category_id' => 1
            ],
            [
                'title' => 'Pembukaan Kelas Industri RPL Bersama PT. Humma Teknologi Indonesia',
                'description' => 'SMKN 8 Jember membuka Kelas Industri RPL bekerja sama dengan PT. Humma Teknologi Indonesia.',
                'image' => 'industri.png',
                'category_id' => 3
            ],
            [
                'title' => 'Memperingati Isra’ Mi’raj di SMKN 8 Jember',
                'description' => 'SMKN 8 Jember menyelenggarakan peringatan Isra’ Mi’raj dengan konsep baru selama dua hari.',
                'image' => 'isra.png',
                'category_id' => 0
            ],
            [
                'title' => 'Workshop Kesehatan Mental untuk Siswa Kelas X SMKN 8 Jember',
                'description' => 'Tim BK SMKN 8 Jember mengadakan workshop kesehatan mental bagi siswa kelas X.',
                'image' => 'healt.png',
                'category_id' => 1
            ],
            [
                'title' => 'Seleksi Roadshow Jember 2025: SMKN 8 Jember Siap Tampil Beda',
                'description' => 'SMKN 8 Jember mengumumkan pelaksanaan Seleksi Roadshow Wilayah Jember 2025.',
                'image' => 'roadshow.png',
                'category_id' => 0
            ],
            [
                'title' => 'Siswa TKJ Diterima Kerja di PT. Mulia Sawit Agro Lestari',
                'description' => 'Prestasi siswa TKJ SMKN 8 Jember diterima bekerja melalui program magang industri.',
                'image' => 'kerja.png',
                'category_id' => 2
            ],
            [
                'title' => 'Siswa TSM Diterima di Yamaha Melalui Program Magang Industri',
                'description' => 'Siswa TSM SMKN 8 Jember diterima bekerja di Yamaha melalui program magang industri.',
                'image' => 'kerjaYamaha.png',
                'category_id' => 2
            ],
            [
                'title' => 'Tim Media DKV SMKN 8 Jember Raih Juara 3 Lomba Video Branding',
                'description' => 'Tim Media DKV SMKN 8 Jember berhasil meraih Juara 3 dalam Lomba Video Branding Showroom.',
                'image' => 'video.png',
                'category_id' => 2
            ],
        ];

        foreach ($announcements as $index => $item) {
            $categoryId = $item['category_id'][0] ?? 1; // ambil integer pertama dari array
            $date = $baseDate->copy()->addDays($index);

            $gallery = Gallery::create([
                'title' => $item['title'],
                'description' => $item['description'], // perbaikan nama kolom
                'image' => $item['image'],
                'category_id' => $categoryId,          // integer, bukan array
                'created_at' => $date,
                'updated_at' => $date,
            ]);

            echo "Created announcement: {$item['title']}\n";
        }


        echo "\nTotal: " . count($announcements) . " pengumuman berhasil dibuat!\n";
    }
}
