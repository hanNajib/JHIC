<?php

namespace Database\Seeders;

use App\Models\Major;
use Illuminate\Database\Seeder;

class MajorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $majors = [
            [
                'name' => 'Teknik Sepeda Motor',
                'short_name' => 'TSM',
                'description' => '<p>Kompetensi keahlian untuk menghasilkan lulusan yang berkompeten di bidang otomotif khususnya sepeda motor, mampu melakukan pekerjaan perawatan dan perbaikan mesin, sistem kelistrikan, chasis dan pemeriksaan kerusakan mesin kendaraan bermotor. Program ini dirancang untuk mempersiapkan peserta didik menjadi teknisi sepeda motor profesional yang menguasai seluruh aspek perawatan dan perbaikan kendaraan.</p><p>Dengan kurikulum yang komprehensif, siswa akan mendapatkan pengalaman praktik langsung di workshop modern yang dilengkapi dengan peralatan terkini, serta teori mendalam tentang sistem mesin, kelistrikan, dan sistem pendingin sepeda motor.</p>',
                'image' => 'https://via.placeholder.com/400x300?text=Teknik+Sepeda+Motor',
                'icon' => 'Io5Bicycle',
            ],
            [
                'name' => 'Teknik Kendaraan Ringan',
                'short_name' => 'TKR',
                'description' => '<p>Program keahlian yang mempersiapkan siswa untuk menjadi teknisi kendaraan ringan yang profesional. Peserta didik akan mendapatkan pengetahuan dan keterampilan dalam diagnosis, pemeliharaan, perbaikan dan modifikasi kendaraan ringan (mobil penumpang) sesuai dengan standar industri otomotif terkini.</p><p>Lulusan program ini diharapkan mampu bekerja di bengkel resmi, showroom, layanan purna jual, atau membuka usaha sendiri dengan skill yang telah teruji dan tersertifikasi di industri otomotif nasional.</p>',
                'image' => 'https://via.placeholder.com/400x300?text=Teknik+Kendaraan+Ringan',
                'icon' => 'FaCar',
            ],
            [
                'name' => 'Rekayasa Perangkat Lunak',
                'short_name' => 'RPL',
                'description' => '<p>Kompetensi keahlian yang menyiapkan peserta didik untuk memiliki keterampilan dalam menganalisis kebutuhan sistem informasi, merancang sistem aplikasi yang sesuai, mengimplementasikan sistem aplikasi berbasis desktop dan web, serta melakukan pemeliharaan dan dukungan sistem aplikasi. Peserta didik akan belajar bahasa pemrograman modern, database management, dan framework terkini yang digunakan industri.</p><p>Program ini membuka peluang karir yang luas baik sebagai developer, programmer, system analyst, atau web designer dengan peluang penghasilan yang sangat kompetitif di era digital ini.</p>',
                'image' => 'https://via.placeholder.com/400x300?text=RPL',
                'icon' => 'RiCode2Line',
            ],
            [
                'name' => 'Teknik Komputer Jaringan',
                'short_name' => 'TKJ',
                'description' => '<p>Program keahlian yang menghasilkan tenaga kerja yang mampu merancang, membangun, mengkonfigurasi, dan memelihara jaringan komputer, serta menguasai teknologi informasi dan komunikasi dengan standar internasional. Peserta didik akan mempelajari administrasi server, keamanan jaringan, dan troubleshooting berbagai masalah network.</p><p>Dengan ilmu yang dikuasai, lulusan TKJ siap bekerja sebagai network administrator, IT support, system administrator, atau security specialist di perusahaan-perusahaan besar maupun startup teknologi.</p>',
                'image' => 'https://via.placeholder.com/400x300?text=TKJ',
                'icon' => 'MdRouter',
            ],
            [
                'name' => 'Desain Komunikasi Visual',
                'short_name' => 'DKV',
                'description' => '<p>Kompetensi keahlian untuk menghasilkan lulusan yang mampu merancang dan memproduksi desain komunikasi visual untuk berbagai kebutuhan baik cetak maupun digital dengan penerapan prinsip desain, estetika, dan teknik production yang tepat. Siswa akan mendalami perangkat lunak desain profesional seperti Adobe Creative Suite, Figma, dan tool modern lainnya untuk menghasilkan karya visual berkualitas tinggi.</p><p>Lulusan DKV memiliki prospek karir yang cerah sebagai graphic designer, UI/UX designer, motion graphics artist, brand specialist, atau entrepreneur di bidang kreatif digital dan advertising.</p>',
                'image' => 'https://via.placeholder.com/400x300?text=DKV',
                'icon' => 'MdDesignServices',
            ],
            [
                'name' => 'Agribisnis Tanaman Pangan dan Hortikultura',
                'short_name' => 'ATPH',
                'description' => '<p>Program keahlian yang menghasilkan tenaga kerja yang mampu menjalankan usaha di bidang agribisnis tanaman pangan dan hortikultura, mulai dari proses produksi, pasca panen, hingga pemasaran dengan menerapkan teknologi pertanian yang tepat dan berkelanjutan. Peserta didik akan belajar teknik budidaya modern, pengelolaan tanah, irigasi, pemupukan, dan pest management untuk hasil panen yang optimal.</p><p>Program ini menjadi solusi bagi generasi muda yang tertarik mengembangkan agrikultur modern dengan sentuhan entrepreneurship, membuka peluang bisnis di sektor pertanian yang terus berkembang.</p>',
                'image' => 'https://via.placeholder.com/400x300?text=ATPH',
                'icon' => 'IoGlobe',
            ],
            [
                'name' => 'Agribisnis Perbenihan Tanaman',
                'short_name' => 'APT',
                'description' => '<p>Kompetensi keahlian yang menyiapkan peserta didik untuk menguasai teknik pemuliaan tanaman, produksi benih berkualitas, sertifikasi benih, serta mampu memulai dan menjalankan usaha produksi dan penjualan benih tanaman dengan standar mutu nasional dan internasional. Siswa akan mempelajari genetika tanaman, seleksi bibit, teknik perbanyakan, dan standar sertifikasi benih yang ketat.</p><p>Lulusan PPT memiliki peluang unik untuk mengembangkan bisnis breeding dan seed production yang sangat strategis dalam mencukupi kebutuhan benih berkualitas untuk sektor pertanian nasional.</p>',
                'image' => 'https://via.placeholder.com/400x300?text=PPT',
                'icon' => 'BiLeaf',
            ],
        ];

        foreach ($majors as $major) {
            Major::create($major);
        }
    }
}
