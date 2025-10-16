<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MajorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $majors = [
            [
                'name' => 'Rekayasa Perangkat Lunak',
                'short_name' => 'RPL',
                'description' => 'Jurusan yang fokus pada pengembangan perangkat lunak, mencakup pemrograman, analisis sistem, dan manajemen proyek IT.',
                'image' => 'majors/rpl.jpg',
            ],
            [
                'name' => 'Teknik Komputer dan Jaringan',
                'short_name' => 'TKJ',
                'description' => 'Mempelajari jaringan komputer, instalasi perangkat keras, serta keamanan jaringan.',
                'image' => 'majors/tkj.jpg',
            ],
            [
                'name' => 'Teknik Kendaraan Ringan Otomotif',
                'short_name' => 'TKRO',
                'description' => 'Berfokus pada perawatan, perbaikan, dan analisis sistem kendaraan ringan.',
                'image' => 'majors/tkro.jpg',
            ],
            [
                'name' => 'Teknik dan Bisnis Sepeda Motor',
                'short_name' => 'TBSM',
                'description' => 'Mengajarkan keahlian servis dan manajemen bengkel sepeda motor modern.',
                'image' => 'majors/tbsm.jpg',
            ],
            [
                'name' => 'Desain Komunikasi Visual',
                'short_name' => 'DKV',
                'description' => 'Jurusan yang fokus pada desain grafis, ilustrasi, dan komunikasi visual digital.',
                'image' => 'majors/dkv.jpg',
            ],
            [
                'name' => 'Multimedia',
                'short_name' => 'MM',
                'description' => 'Mempelajari produksi media digital seperti animasi, video, dan desain interaktif.',
                'image' => 'majors/mm.jpg',
            ],
            [
                'name' => 'Akuntansi dan Keuangan Lembaga',
                'short_name' => 'AKL',
                'description' => 'Fokus pada pembukuan, laporan keuangan, dan manajemen keuangan lembaga.',
                'image' => 'majors/akl.jpg',
            ],
            [
                'name' => 'Manajemen Perkantoran dan Layanan Bisnis',
                'short_name' => 'MPLB',
                'description' => 'Mempelajari administrasi perkantoran, pelayanan publik, dan tata kelola bisnis.',
                'image' => 'majors/mplb.jpg',
            ],
            [
                'name' => 'Bisnis Daring dan Pemasaran',
                'short_name' => 'BDP',
                'description' => 'Mengajarkan strategi pemasaran online, branding digital, dan e-commerce.',
                'image' => 'majors/bdp.jpg',
            ],
            [
                'name' => 'Perhotelan',
                'short_name' => 'PH',
                'description' => 'Fokus pada pelayanan tamu, tata boga, dan manajemen hotel modern.',
                'image' => 'majors/ph.jpg',
            ],
            [
                'name' => 'Tata Boga',
                'short_name' => 'TB',
                'description' => 'Mempelajari seni memasak, penyajian makanan, dan manajemen dapur profesional.',
                'image' => 'majors/tb.jpg',
            ],
            [
                'name' => 'Tata Busana',
                'short_name' => 'TBS',
                'description' => 'Jurusan yang mengajarkan desain mode, menjahit, dan manajemen butik.',
                'image' => 'majors/tbs.jpg',
            ],
            [
                'name' => 'Teknik Elektronika Industri',
                'short_name' => 'TEI',
                'description' => 'Fokus pada otomasi industri, sensor, dan sistem kontrol elektronik.',
                'image' => 'majors/tei.jpg',
            ],
            [
                'name' => 'Teknik Instalasi Tenaga Listrik',
                'short_name' => 'TITL',
                'description' => 'Mempelajari sistem kelistrikan, instalasi, dan perawatan jaringan listrik.',
                'image' => 'majors/titl.jpg',
            ],
            [
                'name' => 'Teknik Pengelasan',
                'short_name' => 'TP',
                'description' => 'Jurusan yang fokus pada teknik penyambungan logam dengan berbagai metode pengelasan.',
                'image' => 'majors/tp.jpg',
            ],
            [
                'name' => 'Teknik Permesinan',
                'short_name' => 'TPM',
                'description' => 'Mempelajari cara kerja mesin, proses manufaktur, dan teknologi industri.',
                'image' => 'majors/tpm.jpg',
            ],
            [
                'name' => 'Agribisnis Tanaman Pangan dan Hortikultura',
                'short_name' => 'ATPH',
                'description' => 'Jurusan yang menggabungkan ilmu pertanian dan bisnis hasil pertanian.',
                'image' => 'majors/atph.jpg',
            ],
            [
                'name' => 'Teknik Geomatika',
                'short_name' => 'TG',
                'description' => 'Fokus pada pemetaan, survei, dan pengolahan data spasial berbasis teknologi.',
                'image' => 'majors/tg.jpg',
            ],
            [
                'name' => 'Teknik Pendingin dan Tata Udara',
                'short_name' => 'TPTU',
                'description' => 'Mengajarkan sistem pendingin, HVAC, dan perawatan peralatan pendingin industri.',
                'image' => 'majors/tptu.jpg',
            ],
            [
                'name' => 'Teknik Konstruksi dan Perumahan',
                'short_name' => 'TKP',
                'description' => 'Jurusan yang mempelajari desain bangunan, konstruksi, dan manajemen proyek perumahan.',
                'image' => 'majors/tkp.jpg',
            ],
        ];

        DB::table('majors')->insert($majors);
    }
}
