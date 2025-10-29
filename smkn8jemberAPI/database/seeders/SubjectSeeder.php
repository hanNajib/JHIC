<?php

namespace Database\Seeders;

use App\Models\Major;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get majors
        $majorTSM = Major::where('short_name', 'TSM')->first();
        $majorTKR = Major::where('short_name', 'TKR')->first();
        $majorRPL = Major::where('short_name', 'RPL')->first();
        $majorTKJ = Major::where('short_name', 'TKJ')->first();
        $majorDKV = Major::where('short_name', 'DKV')->first();
        $majorATPH = Major::where('short_name', 'ATPH')->first();
        $majorPPT = Major::where('short_name', 'PPT')->first();

        $subjects = [
            // Teknik Sepeda Motor
            [
                'name' => 'Pemeliharaan Mesin Sepeda Motor',
                'description' => '<p>Mata pelajaran yang mempelajari konstruksi mesin, proses pemeliharaan rutin, perbaikan, dan troubleshooting mesin sepeda motor</p>',
                'major_id' => $majorTSM?->id,
            ],
            [
                'name' => 'Sistem Kelistrikan Sepeda Motor',
                'description' => '<p>Mempelajari sistem kelistrikan, komponen-komponennya, perawatan, dan perbaikan sistem kelistrikan pada sepeda motor</p>',
                'major_id' => $majorTSM?->id,
            ],
            [
                'name' => 'Sistem Pendingin dan Bahan Bakar',
                'description' => '<p>Belajar tentang sistem pendingin, sistem bahan bakar, karburator, injeksi, dan cara merawatnya</p>',
                'major_id' => $majorTSM?->id,
            ],
            [
                'name' => 'Sistem Transmisi dan Penggerak',
                'description' => '<p>Pembelajaran mendalam tentang sistem transmisi, kopling, rantai, sproket, dan sistem penggerak lainnya</p>',
                'major_id' => $majorTSM?->id,
            ],

            // Teknik Kendaraan Ringan
            [
                'name' => 'Dasar-Dasar Otomotif',
                'description' => '<p>Pengenalan dasar tentang kendaraan, sistem-sistem utama, terminologi, dan standar keselamatan di industri otomotif</p>',
                'major_id' => $majorTKR?->id,
            ],
            [
                'name' => 'Mesin Kendaraan Ringan',
                'description' => '<p>Pembelajaran detail tentang mesin bensin dan diesel, komponennya, cara kerja, dan pemeliharaan</p>',
                'major_id' => $majorTKR?->id,
            ],
            [
                'name' => 'Sistem Suspesi dan Rem',
                'description' => '<p>Mempelajari sistem suspesi, sistem rem, komponen-komponennya, dan prosedur perbaikan yang tepat</p>',
                'major_id' => $majorTKR?->id,
            ],
            [
                'name' => 'Sistem Kemudi dan Roda',
                'description' => '<p>Pembelajaran tentang sistem kemudi, roda, ban, alignment, dan balancing kendaraan</p>',
                'major_id' => $majorTKR?->id,
            ],

            // Rekayasa Perangkat Lunak
            [
                'name' => 'Dasar-Dasar Pemrograman',
                'description' => '<p>Pengenalan konsep pemrograman, algoritma, struktur data, dan latihan coding dengan berbagai bahasa pemrograman</p>',
                'major_id' => $majorRPL?->id,
            ],
            [
                'name' => 'Pengembangan Web',
                'description' => '<p>Pembelajaran HTML, CSS, JavaScript, framework modern seperti React/Vue, dan best practices pengembangan web</p>',
                'major_id' => $majorRPL?->id,
            ],
            [
                'name' => 'Basis Data',
                'description' => '<p>Pembelajaran tentang desain database, SQL, normalisasi data, dan manajemen database server</p>',
                'major_id' => $majorRPL?->id,
            ],
            [
                'name' => 'Sistem Operasi dan Jaringan',
                'description' => '<p>Pemahaman sistem operasi, networking basics, protokol komunikasi, dan security fundamentals</p>',
                'major_id' => $majorRPL?->id,
            ],

            // Teknik Komputer Jaringan
            [
                'name' => 'Dasar Jaringan Komputer',
                'description' => '<p>Pengenalan konsep networking, model OSI, protokol TCP/IP, dan topologi jaringan</p>',
                'major_id' => $majorTKJ?->id,
            ],
            [
                'name' => 'Instalasi dan Konfigurasi Jaringan',
                'description' => '<p>Pembelajaran praktik instalasi perangkat keras jaringan, konfigurasi switch, router, dan access point</p>',
                'major_id' => $majorTKJ?->id,
            ],
            [
                'name' => 'Keamanan Jaringan',
                'description' => '<p>Pembelajaran tentang firewall, VPN, encryption, penetration testing, dan best practices security</p>',
                'major_id' => $majorTKJ?->id,
            ],
            [
                'name' => 'Administrasi Server',
                'description' => '<p>Pembelajaran manajemen server, user management, backup recovery, dan maintenance server</p>',
                'major_id' => $majorTKJ?->id,
            ],

            // Desain Komunikasi Visual
            [
                'name' => 'Dasar-Dasar Desain',
                'description' => '<p>Pembelajaran prinsip desain, teori warna, tipografi, komposisi, dan estetika visual</p>',
                'major_id' => $majorDKV?->id,
            ],
            [
                'name' => 'Adobe Creative Suite',
                'description' => '<p>Pembelajaran mendalam tentang Photoshop, Illustrator, InDesign, Premiere, dan After Effects</p>',
                'major_id' => $majorDKV?->id,
            ],
            [
                'name' => 'Desain Grafis dan Branding',
                'description' => '<p>Pembelajaran tentang desain logo, corporate identity, brand guidelines, dan packaging design</p>',
                'major_id' => $majorDKV?->id,
            ],
            [
                'name' => 'Media Digital dan UI/UX',
                'description' => '<p>Pembelajaran tentang design untuk web, mobile, user experience, wireframing, dan prototyping</p>',
                'major_id' => $majorDKV?->id,
            ],

            // Agribisnis Tanaman Pangan dan Hortikultura
            [
                'name' => 'Dasar-Dasar Pertanian',
                'description' => '<p>Pengenalan tentang ilmu pertanian, tanah, iklim, dan faktor-faktor yang mempengaruhi pertumbuhan tanaman</p>',
                'major_id' => $majorATPH?->id,
            ],
            [
                'name' => 'Budidaya Tanaman Pangan',
                'description' => '<p>Pembelajaran teknik budidaya padi, jagung, kedelai, dan tanaman pangan lainnya secara modern</p>',
                'major_id' => $majorATPH?->id,
            ],
            [
                'name' => 'Budidaya Tanaman Hortikultura',
                'description' => '<p>Pembelajaran budidaya sayuran, buah-buahan, bunga, dan tanaman hias dengan teknologi terkini</p>',
                'major_id' => $majorATPH?->id,
            ],
            [
                'name' => 'Pengelolaan Hasil Pertanian dan Agribisnis',
                'description' => '<p>Pembelajaran pasca panen, pengolahan produk, manajemen bisnis, dan pemasaran produk pertanian</p>',
                'major_id' => $majorATPH?->id,
            ],

            // Pemuliaan dan Perbenihan Tanaman
            [
                'name' => 'Genetika dan Pemuliaan Tanaman',
                'description' => '<p>Pembelajaran tentang genetika dasar, hereditas, seleksi tanaman, dan teknik-teknik pemuliaan modern</p>',
                'major_id' => $majorPPT?->id,
            ],
            [
                'name' => 'Produksi Benih',
                'description' => '<p>Pembelajaran tentang proses produksi benih, penyimpanan benih, dan penanganan benih berkualitas</p>',
                'major_id' => $majorPPT?->id,
            ],
            [
                'name' => 'Sertifikasi dan Standar Benih',
                'description' => '<p>Pembelajaran tentang standar benih, uji viabilitas, sertifikasi benih, dan regulasi industri benih</p>',
                'major_id' => $majorPPT?->id,
            ],
            [
                'name' => 'Bisnis dan Entrepreneurship Benih',
                'description' => '<p>Pembelajaran manajemen usaha benih, pemasaran, distribusi, dan pengembangan pasar produk benih</p>',
                'major_id' => $majorPPT?->id,
            ],
        ];

        DB::table('subjects')->insert($subjects);
    }
}
