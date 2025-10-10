<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil user pertama sebagai author (atau buat jika belum ada)
        $author = User::first();
        
        if (!$author) {
            echo "Warning: No user found. Please run AdminSeeder first.\n";
            return;
        }

        // Buat kategori artikel jika belum ada
        $categories = [];
        $categoryTypes = [
            ['type' => 'articles', 'name' => 'Berita Sekolah', 'color' => '#3B82F6'],
            ['type' => 'articles', 'name' => 'Prestasi', 'color' => '#10B981'],
            ['type' => 'articles', 'name' => 'Kegiatan', 'color' => '#F59E0B'],
            ['type' => 'articles', 'name' => 'Pengumuman', 'color' => '#EF4444'],
        ];

        foreach ($categoryTypes as $catData) {
            $categories[] = Category::firstOrCreate(
                ['type' => $catData['type'], 'name' => $catData['name']],
                ['color' => $catData['color']]
            );
        }

        // Array sample artikel
        $articles = [
            [
                'title' => 'SMKN 8 Jember Raih Juara 1 Lomba Web Design Tingkat Provinsi',
                'content' => '<p>SMKN 8 Jember kembali mengukir prestasi gemilang dengan meraih Juara 1 dalam Lomba Web Design Tingkat Provinsi Jawa Timur yang diselenggarakan pada tanggal 1-3 Oktober 2025.</p><p>Tim yang terdiri dari 3 siswa jurusan Rekayasa Perangkat Lunak berhasil mengalahkan 45 tim dari berbagai SMK se-Jawa Timur dengan karya website portfolio yang inovatif dan responsif.</p><p>Kepala Sekolah menyampaikan apresiasi tinggi kepada tim pembimbing dan siswa yang telah mengharumkan nama sekolah di tingkat provinsi.</p>',
                'status' => 'published',
                'categories' => [0, 1], // Berita & Prestasi
            ],
            [
                'title' => 'Pelaksanaan MPLS 2025: Menyambut Siswa Baru dengan Penuh Semangat',
                'content' => '<p>Masa Pengenalan Lingkungan Sekolah (MPLS) tahun ajaran 2025/2026 telah dilaksanakan dengan sukses selama 3 hari, dari tanggal 15-17 Juli 2025.</p><p>Sebanyak 420 siswa baru dari berbagai jurusan mengikuti rangkaian kegiatan MPLS yang meliputi pengenalan visi misi sekolah, tata tertib, pengenalan ekstrakurikuler, dan character building.</p><p>Kegiatan MPLS tahun ini mengusung tema "Bersama Membangun Karakter Siswa Unggul dan Berakhlak Mulia" dengan berbagai kegiatan yang edukatif dan menyenangkan.</p>',
                'status' => 'published',
                'categories' => [0, 2], // Berita & Kegiatan
            ],
            [
                'title' => 'Kunjungan Industri ke PT Telkom Indonesia: Mengenal Dunia Kerja Nyata',
                'content' => '<p>Siswa kelas XI jurusan Teknik Komputer dan Jaringan (TKJ) melaksanakan kunjungan industri ke PT Telkom Indonesia Regional V Jawa Timur pada Kamis, 20 September 2025.</p><p>Dalam kunjungan ini, siswa mendapat kesempatan untuk melihat langsung infrastruktur telekomunikasi modern, data center, dan sistem keamanan jaringan yang diterapkan di industri.</p><p>Kunjungan industri merupakan bagian dari program link and match sekolah dengan dunia industri untuk mempersiapkan lulusan yang siap kerja.</p>',
                'status' => 'published',
                'categories' => [0, 2], // Berita & Kegiatan
            ],
            [
                'title' => 'Pembukaan Pendaftaran Ekstrakurikuler Semester Ganjil 2025/2026',
                'content' => '<p>SMKN 8 Jember membuka pendaftaran ekstrakurikuler untuk semester ganjil tahun ajaran 2025/2026 mulai tanggal 1-10 Oktober 2025.</p><p>Tersedia 15 pilihan ekstrakurikuler meliputi Pramuka, PMR, OSIS, Paskibra, Robotika, Programming Club, Design Grafis, Video Editing, Futsal, Basket, Volley, Badminton, English Club, Japanese Club, dan Paduan Suara.</p><p>Pendaftaran dapat dilakukan secara online melalui website sekolah atau langsung ke ruang OSIS. Setiap siswa wajib mengikuti minimal 1 ekstrakurikuler.</p>',
                'status' => 'published',
                'categories' => [3], // Pengumuman
            ],
            [
                'title' => 'Workshop Internet of Things (IoT) untuk Guru dan Siswa',
                'content' => '<p>SMKN 8 Jember mengadakan Workshop Internet of Things (IoT) yang diikuti oleh 30 guru dan 50 siswa pada tanggal 25-27 September 2025.</p><p>Workshop ini menghadirkan praktisi IoT dari industri yang memberikan materi tentang konsep IoT, Arduino, sensor, dan pembuatan smart home sederhana.</p><p>Peserta workshop mendapat kesempatan praktek langsung membuat project IoT dan mendapat sertifikat sebagai bekal pengembangan kompetensi di bidang teknologi terkini.</p>',
                'status' => 'published',
                'categories' => [0, 2], // Berita & Kegiatan
            ],
            [
                'title' => 'Siswa SMKN 8 Jember Wakili Jawa Timur di LKS Nasional',
                'content' => '<p>Lima siswa terbaik SMKN 8 Jember terpilih untuk mewakili Provinsi Jawa Timur dalam Lomba Kompetensi Siswa (LKS) Tingkat Nasional yang akan diselenggarakan di Jakarta pada November 2025.</p><p>Kelima siswa tersebut lolos dari seleksi ketat LKS Tingkat Provinsi dengan bidang lomba Web Technologies, IT Software Solutions for Business, Mobile Robotics, Network Systems Administration, dan Cyber Security.</p><p>Sekolah memberikan dukungan penuh berupa pembimbingan intensif dan fasilitas latihan untuk mempersiapkan siswa menghadapi kompetisi nasional.</p>',
                'status' => 'published',
                'categories' => [0, 1], // Berita & Prestasi
            ],
            [
                'title' => 'Upgrading Guru: Pelatihan Kurikulum Merdeka dan Platform Digital',
                'content' => '<p>Seluruh guru SMKN 8 Jember mengikuti pelatihan Kurikulum Merdeka dan penggunaan platform digital dalam pembelajaran pada 10-12 September 2025.</p><p>Pelatihan ini bertujuan meningkatkan kompetensi guru dalam mengimplementasikan Kurikulum Merdeka dan memanfaatkan teknologi dalam proses belajar mengajar.</p><p>Materi pelatihan meliputi penyusunan modul ajar, asesmen autentik, pembelajaran berbasis project, dan penggunaan Google Classroom, Canva, dan platform LMS lainnya.</p>',
                'status' => 'published',
                'categories' => [0, 2], // Berita & Kegiatan
            ],
            [
                'title' => 'Pelaksanaan Penilaian Tengah Semester (PTS) Gasal 2025/2026',
                'content' => '<p>Penilaian Tengah Semester (PTS) Gasal tahun ajaran 2025/2026 akan dilaksanakan pada tanggal 21-28 Oktober 2025 untuk semua tingkat kelas.</p><p>PTS dilakukan secara daring menggunakan platform CBT (Computer Based Test) sekolah. Siswa diharapkan mempersiapkan diri dengan baik dan memastikan perangkat laptop/PC dalam kondisi baik.</p><p>Jadwal detail PTS dapat dilihat di mading sekolah atau website resmi sekolah. Siswa yang berhalangan hadir wajib menyerahkan surat keterangan.</p>',
                'status' => 'published',
                'categories' => [3], // Pengumuman
            ],
            [
                'title' => 'Penandatanganan MoU dengan 10 Perusahaan untuk Program Magang Siswa',
                'content' => '<p>SMKN 8 Jember menandatangani Memorandum of Understanding (MoU) dengan 10 perusahaan teknologi untuk program Praktik Kerja Lapangan (PKL) siswa tahun 2026.</p><p>Perusahaan yang bermitra antara lain PT Telkom Indonesia, PT Industri Telekomunikasi Indonesia, startup teknologi lokal, dan beberapa software house ternama di Jember dan Surabaya.</p><p>Kerjasama ini memberikan kesempatan siswa untuk magang di perusahaan bonafide dan meningkatkan peluang kerja setelah lulus.</p>',
                'status' => 'published',
                'categories' => [0], // Berita
            ],
            [
                'title' => 'Festival Seni dan Budaya SMKN 8 Jember 2025',
                'content' => '<p>SMKN 8 Jember akan menggelar Festival Seni dan Budaya pada tanggal 15 November 2025 sebagai ajang kreativitas siswa di bidang seni dan budaya.</p><p>Festival ini menampilkan berbagai pertunjukan seperti musik, tari tradisional, modern dance, drama, stand up comedy, fashion show, dan pameran karya seni rupa siswa.</p><p>Acara terbuka untuk umum dan gratis. Mari ramaikan Festival Seni dan Budaya SMKN 8 Jember dan dukung kreativitas generasi muda!</p>',
                'status' => 'published',
                'categories' => [2, 3], // Kegiatan & Pengumuman
            ],
            [
                'title' => 'Penerapan Teknologi AI dalam Pembelajaran di SMKN 8 Jember',
                'content' => '<p>SMKN 8 Jember mulai mengintegrasikan teknologi Artificial Intelligence (AI) dalam proses pembelajaran untuk meningkatkan kualitas pendidikan.</p><p>Teknologi AI digunakan untuk personalisasi pembelajaran, analisis perkembangan siswa, dan memberikan rekomendasi materi belajar yang sesuai dengan kemampuan masing-masing siswa.</p><p>Implementasi AI ini merupakan bagian dari program digitalisasi sekolah menuju smart school yang adaptif dan future-ready.</p>',
                'status' => 'published',
                'categories' => [0], // Berita
            ],
            [
                'title' => 'SMKN 8 Jember Juara Umum Olimpiade Sains dan Teknologi Regional',
                'content' => '<p>Prestasi membanggakan kembali diraih SMKN 8 Jember dengan menjadi Juara Umum Olimpiade Sains dan Teknologi Regional Jawa Timur 2025.</p><p>Tim SMKN 8 Jember berhasil meraih 3 medali emas, 5 medali perak, dan 4 medali perunggu dari berbagai cabang lomba meliputi Matematika, Fisika, Kimia, Biologi, dan Informatika.</p><p>Pencapaian ini merupakan hasil kerja keras siswa dan guru pembimbing yang konsisten berlatih dan terus mengasah kemampuan.</p>',
                'status' => 'published',
                'categories' => [0, 1], // Berita & Prestasi
            ],
            [
                'title' => 'Program Beasiswa Prestasi untuk Siswa Berprestasi SMKN 8 Jember',
                'content' => '<p>SMKN 8 Jember membuka program Beasiswa Prestasi bagi siswa yang berprestasi di bidang akademik, olahraga, seni, dan teknologi.</p><p>Beasiswa meliputi pembebasan SPP selama 1 tahun, bantuan buku, dan akses ke program pengembangan talenta khusus. Pendaftaran dibuka hingga 31 Oktober 2025.</p><p>Persyaratan dan formulir pendaftaran dapat diunduh di website sekolah atau diambil langsung di bagian Tata Usaha.</p>',
                'status' => 'published',
                'categories' => [3], // Pengumuman
            ],
            [
                'title' => 'Launching Aplikasi E-Learning SMKN 8 Jember',
                'content' => '<p>SMKN 8 Jember resmi meluncurkan aplikasi E-Learning berbasis web dan mobile untuk mendukung pembelajaran digital yang lebih interaktif.</p><p>Aplikasi ini dilengkapi fitur video pembelajaran, quiz online, diskusi forum, pengumpulan tugas digital, dan monitoring progress belajar siswa secara real-time.</p><p>Aplikasi E-Learning dikembangkan oleh tim IT siswa dan guru SMKN 8 Jember bekerja sama dengan alumni yang kini bekerja di industri teknologi.</p>',
                'status' => 'published',
                'categories' => [0], // Berita
            ],
            [
                'title' => 'Open House SMKN 8 Jember: Kenali Jurusan dan Fasilitasnya',
                'content' => '<p>SMKN 8 Jember mengadakan Open House pada 5-7 November 2025 untuk siswa SMP yang ingin mengenal lebih dekat jurusan dan fasilitas sekolah.</p><p>Acara Open House meliputi presentasi jurusan, demo praktikum, tour laboratorium, konsultasi pendidikan, dan games berhadiah menarik.</p><p>Pendaftaran Open House gratis dan bisa dilakukan via WhatsApp ke nomor 0812-3456-7890. Ayo datang dan temukan jurusan favoritmu!</p>',
                'status' => 'published',
                'categories' => [2, 3], // Kegiatan & Pengumuman
            ],
            [
                'title' => '[DRAFT] Rencana Pembangunan Gedung Baru Tahun 2026',
                'content' => '<p>SMKN 8 Jember merencanakan pembangunan gedung baru untuk menambah ruang kelas dan laboratorium pada tahun 2026.</p><p>Gedung baru akan terdiri dari 3 lantai dengan total 12 ruang kelas, 4 laboratorium komputer modern, ruang multimedia, dan area coworking space untuk siswa.</p><p>Pembangunan direncanakan dimulai pada Januari 2026 dan ditargetkan selesai pada Agustus 2026.</p>',
                'status' => 'draft',
                'categories' => [0], // Berita
            ],
        ];

        // Insert artikel
        foreach ($articles as $index => $articleData) {
            $title = $articleData['title'];
            $slug = Str::slug($title);
            
            // Pastikan slug unique
            $originalSlug = $slug;
            $counter = 1;
            while (Article::where('slug', $slug)->exists()) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }

            $article = Article::create([
                'title' => $title,
                'slug' => $slug,
                'content' => $articleData['content'],
                'status' => $articleData['status'],
                'image' => $articleData['image'] ?? 'articles/default-article-' . ($index + 1) . '.jpg',
                'author_id' => $author->id,
                'views' => rand(10, 500), // Random views untuk testing
            ]);

            // Attach categories
            $categoryIds = [];
            foreach ($articleData['categories'] as $catIndex) {
                if (isset($categories[$catIndex])) {
                    $categoryIds[] = $categories[$catIndex]->id;
                }
            }
            
            if (!empty($categoryIds)) {
                $article->categories()->attach($categoryIds);
            }

            echo "Created article: {$title}\n";
        }

        echo "\nArticle seeder completed successfully!\n";
        echo "Total articles created: " . count($articles) . "\n";
        echo "Published: " . collect($articles)->where('status', 'published')->count() . "\n";
        echo "Draft: " . collect($articles)->where('status', 'draft')->count() . "\n";
    }
}
