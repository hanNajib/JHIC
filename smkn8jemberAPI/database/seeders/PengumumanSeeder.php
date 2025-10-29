<?php

namespace Database\Seeders;

use App\Models\Announcement;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class PengumumanSeeder extends Seeder
{
    public function run(): void
    {

        $categoryTypes = [
            ['type' => 'announcements', 'name' => 'Penting', 'color' => '#e10000'],
            ['type' => 'announcements', 'name' => 'Info', 'color' => '#0800e1'],
        ];

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
                'title' => 'Pengumuman Kelulusan Siswa Kelas XII Tahun Pelajaran 2024/2025',
                'content' => '
                    <p>Kepada seluruh siswa kelas XII SMKN 8 Jember, kami ucapkan selamat telah menyelesaikan masa studi. 
                    Pengumuman kelulusan dapat diakses melalui 
                    <a href="https://smkn8jember.sch.id" class="text-blue-600 underline">
                    portal resmi sekolah</a> mulai tanggal <strong>3 Mei 2025</strong> pukul 10.00 WIB.</p>
                    <p>Diharapkan seluruh siswa tidak datang ke sekolah secara berkerumun. 
                    Hasil kelulusan dapat diunduh dalam bentuk <em>file PDF</em> di portal tersebut.</p>
                ',
                'category_index' => 0,
            ],
            [
                'title' => 'Pendaftaran Peserta Didik Baru (PPDB) SMKN 8 Jember Tahun 2025/2026 Dibuka',
                'content' => '
                    <p>SMKN 8 Jember membuka pendaftaran untuk calon peserta didik baru tahun ajaran 
                    <strong>2025/2026</strong>. Pendaftaran dilakukan secara <em>online</em> melalui laman 
                    <a href="https://ppdb.smkn8jember.sch.id" class="text-blue-600 underline">
                    ppdb.smkn8jember.sch.id</a>.</p>
                    <ul class="list-disc pl-6">
                        <li>Pendaftaran dibuka mulai tanggal 10 Juni 2025</li>
                        <li>Penutupan pendaftaran pada 24 Juni 2025</li>
                        <li>Seleksi administrasi dilakukan secara daring</li>
                    </ul>
                    <p>Informasi lengkap dapat dilihat di papan pengumuman sekolah atau media sosial resmi SMKN 8 Jember.</p>
                ',
                'category_index' => 1,
            ],
            [
                'title' => 'Pemberitahuan Kegiatan Masa Pengenalan Lingkungan Sekolah (MPLS) Tahun 2025',
                'content' => '
                    <p>Kepada seluruh siswa baru SMKN 8 Jember, dengan hormat kami sampaikan bahwa kegiatan 
                    <strong>Masa Pengenalan Lingkungan Sekolah (MPLS)</strong> akan dilaksanakan pada 
                    <strong>tanggal 15–17 Juli 2025</strong> bertempat di lingkungan SMKN 8 Jember.</p>
                    <p>Diharapkan peserta hadir tepat waktu dengan mengenakan seragam SMP asal dan membawa alat tulis lengkap. 
                    Kehadiran wajib dan menjadi bagian dari proses administrasi awal tahun pelajaran.</p>
                    <p>Demikian pemberitahuan ini disampaikan agar dapat dilaksanakan sebagaimana mestinya.</p>
                ',
                'category_index' => 1,
            ],
            [
                'title' => 'Jadwal Pembagian Raport Semester Genap Tahun 2024/2025',
                'content' => '
                    <p>Kepada seluruh siswa dan orang tua/wali murid SMKN 8 Jember, kami informasikan bahwa pembagian raport semester genap 
                    akan dilaksanakan pada <strong>Sabtu, 21 Juni 2025</strong> mulai pukul <strong>08.00 WIB</strong> 
                    di ruang kelas masing-masing.</p>
                    <p>Diharapkan orang tua/wali hadir untuk menerima laporan hasil belajar putra-putrinya secara langsung.</p>
                ',
                'category_index' => 0,
            ],
            [
                'title' => 'Pemberitahuan Libur Akhir Tahun Pelajaran 2024/2025',
                'content' => '
                    <p>Berdasarkan kalender pendidikan Dinas Pendidikan Provinsi Jawa Timur, 
                    SMKN 8 Jember menetapkan libur akhir tahun pelajaran mulai tanggal <strong>23 Juni 2025</strong> 
                    sampai dengan <strong>13 Juli 2025</strong>.</p>
                    <p>Seluruh siswa diharapkan tetap menjaga kesehatan dan menghindari kegiatan yang dapat merugikan diri sendiri maupun sekolah.</p>
                ',
                'category_index' => 1,
            ],
            [
                'title' => 'Pemberitahuan Kegiatan Gotong Royong dan Kebersihan Lingkungan Sekolah',
                'content' => '
                    <p>Dalam rangka menciptakan lingkungan sekolah yang bersih dan nyaman, 
                    seluruh siswa dan guru diharapkan mengikuti kegiatan <strong>Kerja Bakti Bersama</strong> 
                    yang akan dilaksanakan pada <strong>Sabtu, 5 Juli 2025</strong>.</p>
                    <p>Setiap kelas wajib membawa peralatan kebersihan masing-masing. 
                    Kegiatan dimulai pukul <strong>07.00 WIB</strong> hingga selesai.</p>
                ',
                'category_index' => 1,
            ],
            [
                'title' => 'Pemberitahuan Kegiatan Pramuka Wajib bagi Siswa Kelas X',
                'content' => '
                    <p>Kepada seluruh siswa kelas X tahun pelajaran 2025/2026, 
                    diwajibkan mengikuti kegiatan <strong>Pramuka Wajib</strong> yang dilaksanakan setiap hari Jumat pukul 13.00 WIB.</p>
                    <p>Kegiatan ini merupakan bagian dari kurikulum sekolah dan wajib diikuti oleh seluruh siswa.</p>
                ',
                'category_index' => 0,
            ],
            [
                'title' => 'Undangan Rapat Orang Tua/Wali Siswa Kelas X, XI, dan XII',
                'content' => '
                    <p>Dengan hormat, kami mengundang seluruh orang tua/wali siswa SMKN 8 Jember untuk menghadiri 
                    <strong>rapat koordinasi awal tahun pelajaran</strong> yang akan diselenggarakan pada 
                    <strong>Sabtu, 26 Juli 2025</strong> pukul 08.00 WIB di aula sekolah.</p>
                    <p>Agenda: Pembahasan program sekolah, tata tertib, serta komitmen bersama dalam mendukung kegiatan belajar mengajar.</p>
                ',
                'category_index' => 0,
            ],
            [
                'title' => 'Pemberitahuan Pembayaran Iuran Komite Sekolah Tahun 2025/2026',
                'content' => '
                    <p>Dengan hormat, kami informasikan kepada seluruh orang tua/wali siswa 
                    bahwa pembayaran iuran komite sekolah dapat dilakukan mulai tanggal 
                    <strong>1 Agustus 2025</strong> melalui bendahara sekolah atau rekening resmi komite.</p>
                    <p>Dana yang terkumpul akan digunakan untuk mendukung kegiatan non-akademik siswa.</p>
                ',
                'category_index' => 1,
            ],
            [
                'title' => 'Pemberitahuan Pemilihan Ketua OSIS Periode 2025/2026',
                'content' => '
                    <p>Sehubungan dengan berakhirnya masa jabatan pengurus OSIS periode 2024/2025, 
                    maka akan dilaksanakan <strong>Pemilihan Ketua OSIS</strong> pada tanggal 
                    <strong>10 September 2025</strong>.</p>
                    <p>Diharapkan seluruh siswa berpartisipasi aktif dalam kegiatan demokrasi sekolah ini.</p>
                ',
                'category_index' => 1,
            ],
            [
                'title' => 'Pengumuman Lomba Kebersihan Kelas dan Lingkungan Sekolah',
                'content' => '
                    <p>Dalam rangka memperingati Hari Kemerdekaan Republik Indonesia ke-80, 
                    SMKN 8 Jember akan mengadakan <strong>Lomba Kebersihan dan Kerapian Kelas</strong> 
                    yang dimulai pada tanggal <strong>1 Agustus 2025</strong>.</p>
                    <p>Pemenang akan diumumkan pada upacara 17 Agustus 2025 dan mendapatkan penghargaan dari sekolah.</p>
                ',
                'category_index' => 1,
            ],
            [
                'title' => 'Pengumuman Upacara Peringatan Hari Kemerdekaan RI ke-80',
                'content' => '
                    <p>Seluruh warga sekolah diwajibkan mengikuti upacara peringatan HUT ke-80 Kemerdekaan RI 
                    pada <strong>17 Agustus 2025</strong> pukul 07.00 WIB di lapangan utama SMKN 8 Jember.</p>
                    <p>Peserta upacara diwajibkan mengenakan seragam lengkap sesuai ketentuan.</p>
                ',
                'category_index' => 0,
            ],
            [
                'title' => 'Pemberitahuan Kegiatan P5 (Projek Penguatan Profil Pelajar Pancasila)',
                'content' => '
                    <p>Kegiatan P5 untuk semester ganjil akan dilaksanakan mulai tanggal 
                    <strong>1 September 2025</strong> dengan tema <em>Kewirausahaan dan Kreativitas</em>.</p>
                    <p>Diharapkan siswa dapat mempersiapkan ide proyek yang akan dipresentasikan di akhir kegiatan.</p>
                ',
                'category_index' => 1,
            ],
            [
                'title' => 'Pemberitahuan Ujian Tengah Semester (UTS) Ganjil Tahun 2025/2026',
                'content' => '
                    <p>Pelaksanaan UTS semester ganjil akan dilaksanakan pada <strong>6–11 Oktober 2025</strong>.</p>
                    <p>Seluruh siswa wajib mempersiapkan diri dan menjaga kedisiplinan selama ujian berlangsung.</p>
                ',
                'category_index' => 0,
            ],
            [
                'title' => 'Pengumuman Lomba Class Meeting Semester Ganjil',
                'content' => '
                    <p>Setelah pelaksanaan ujian, sekolah akan mengadakan kegiatan <strong>Class Meeting</strong> 
                    yang berisi berbagai lomba akademik dan non-akademik.</p>
                    <p>Kegiatan ini bertujuan mempererat hubungan antar siswa dan menumbuhkan semangat sportivitas.</p>
                ',
                'category_index' => 1,
            ],
            [
                'title' => 'Pemberitahuan Libur Semester Ganjil Tahun 2025/2026',
                'content' => '
                    <p>Libur semester ganjil ditetapkan mulai tanggal <strong>22 Desember 2025</strong> 
                    sampai dengan <strong>4 Januari 2026</strong>. 
                    Sekolah akan kembali aktif pada <strong>Senin, 5 Januari 2026</strong>.</p>
                ',
                'category_index' => 1,
            ],
            [
                'title' => 'Undangan Kegiatan Workshop Guru dan Tenaga Kependidikan',
                'content' => '
                    <p>Kepada seluruh guru dan tenaga kependidikan SMKN 8 Jember, diharapkan hadir 
                    dalam kegiatan <strong>Workshop Peningkatan Kompetensi Digital Guru</strong> 
                    pada <strong>10 Januari 2026</strong> di ruang multimedia.</p>
                ',
                'category_index' => 0,
            ],
            [
                'title' => 'Pemberitahuan Perubahan Jadwal Kegiatan Ekstrakurikuler',
                'content' => '
                    <p>Mulai tanggal <strong>20 Januari 2026</strong>, jadwal kegiatan ekstrakurikuler akan disesuaikan 
                    dengan kalender akademik terbaru. Informasi detail dapat dilihat di papan pengumuman OSIS.</p>
                ',
                'category_index' => 1,
            ],
            [
                'title' => 'Pemberitahuan Ujian Praktik Kejuruan (UPK) Tahun 2026',
                'content' => '
                    <p>Kepada seluruh siswa kelas XII, pelaksanaan <strong>Ujian Praktik Kejuruan (UPK)</strong> 
                    akan dimulai pada <strong>15 Februari 2026</strong>.</p>
                    <p>Setiap jurusan diwajibkan mempersiapkan alat, bahan, serta laporan sesuai dengan instruksi guru pembimbing.</p>
                ',
                'category_index' => 0,
            ],
        ];

        foreach ($announcements as $index => $item) {
            $category = $categories[$item['category_index']] ?? $categories[0];
            $date = $baseDate->copy()->addDays($index);

            Announcement::create([
                'title' => $item['title'],
                'content' => $item['content'],
                'image' => null,
                'category_id' => $category->id,
                'created_at' => $date,
                'updated_at' => $date,
            ]);

            echo "Created announcement: {$item['title']} ({$category->name})\n";
        }

        echo "\n Total: " . count($announcements) . " pengumuman berhasil dibuat!\n";
    }
}
